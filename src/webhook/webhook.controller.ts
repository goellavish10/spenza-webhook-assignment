import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SubscribeWebhookDto } from './dto/subscribe-webhook.dto';
import { Webhook } from 'src/schemas/Webhook.schema';
import { WebhookService } from './webhook.service';
import { WebhookEventDto } from './dto/webhook-event.dto';

@Controller('webhooks')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('subscribe')
  async subscribeWebhook(
    @Body() subscribeWebhookDto: SubscribeWebhookDto,
  ): Promise<Webhook> {
    return this.webhookService.subscribeWebhook(subscribeWebhookDto);
  }

  @Get()
  async getAllWebhooks(): Promise<Webhook[]> {
    return this.webhookService.getAllWebhooks();
  }

  @Post('event')
  async handleWebhookEvent(
    @Body() webhookEventDto: WebhookEventDto,
  ): Promise<void> {
    await this.webhookService.handleWebhookEvent(webhookEventDto);
  }

  @Delete(':id')
  async cancelSubscription(@Param('id') id: string): Promise<Webhook> {
    return this.webhookService.cancelSubscription(id);
  }
}
