import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Webhook } from 'src/schemas/Webhook.schema';
import { Model } from 'mongoose';
import { WebhookEvent } from 'src/schemas/WebhookEvent.schema';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { HttpService } from '@nestjs/axios';
import { SubscribeWebhookDto } from './dto/subscribe-webhook.dto';
import { WebhookEventDto } from './dto/webhook-event.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class WebhookService {
  constructor(
    @InjectModel(Webhook.name) private webhookModel: Model<Webhook>,
    @InjectModel(WebhookEvent.name)
    private webhookEventModel: Model<WebhookEvent>,
    @InjectQueue('webhook-events-queue') private webhookQueue: Queue,
    @InjectQueue('failed-webhook-events-queue')
    private failedWebhookQueue: Queue,
    private httpService: HttpService,
  ) {}

  async subscribeWebhook(
    user: any,
    subscribeWebhookDto: SubscribeWebhookDto,
  ): Promise<Webhook> {
    console.log(user);
    const createdWebhook = new this.webhookModel({
      ...subscribeWebhookDto,
      user: user.id,
    });
    return createdWebhook.save();
  }

  async getAllWebhooks(user: any): Promise<Webhook[]> {
    return this.webhookModel.find({ user: user.id }).exec();
  }

  async getAllWebhookEvents(user: any): Promise<WebhookEvent[]> {
    return this.webhookEventModel
      .find({ user: user.id })
      .populate('webhook')
      .select('-user -_id -__v')
      .exec();
  }

  async handleWebhookEvent(
    user: any,
    webhookEventDto: WebhookEventDto,
  ): Promise<void> {
    const webhooks = await this.webhookModel
      .find({ source: webhookEventDto.source })
      .exec();
    for (const webhook of webhooks) {
      const createdEvent = new this.webhookEventModel({
        ...webhookEventDto,
        webhook: webhook.id,
        user: user.id,
      });
      await createdEvent.save();
      await this.webhookQueue.add('process-webhook', {
        callbackUrl: webhook.callbackUrl,
        payload: webhookEventDto.payload,
      });
    }
  }

  async processWebhook(job: any): Promise<void> {
    const { callbackUrl, payload } = job.data;
    try {
      await lastValueFrom(this.httpService.post(callbackUrl, payload));
    } catch (error) {
      console.error(`Failed to send webhook to ${callbackUrl}:`, error);
      console.error('Retrying webhook in 5 seconds...');
      await this.failedWebhookQueue.add(
        'retry-webhook',
        {
          callbackUrl,
          payload,
        },
        { delay: 5000 },
      );
    }
  }

  async retryFailedWebhooks(job: any): Promise<void> {
    const { callbackUrl, payload } = job.data;
    try {
      await lastValueFrom(this.httpService.post(callbackUrl, payload));
      console.log(`Successfully retried webhook to ${callbackUrl}`);
    } catch (error) {
      console.error(`Failed to retry webhook to ${callbackUrl}:`, error);
    }
  }

  async cancelSubscription(user: any, id: string): Promise<Webhook> {
    const deletedWebhook = await this.webhookModel.findByIdAndDelete(id).exec();
    await this.webhookEventModel.deleteMany({ webhook: id }).exec();
    if (!deletedWebhook) {
      throw new NotFoundException(
        `Webhook subscription with ID "${id}" not found`,
      );
    }
    return deletedWebhook;
  }
}
