import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { SubscribeWebhookDto } from './dto/subscribe-webhook.dto';
import { Webhook } from 'src/schemas/Webhook.schema';
import { WebhookService } from './webhook.service';
import { WebhookEventDto } from './dto/webhook-event.dto';
import { CustomRequest } from 'src/middleware/jwt.middleware';
import { WebhookEvent } from 'src/schemas/WebhookEvent.schema';

@Controller('webhooks')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post('subscribe')
  async subscribeWebhook(
    @Req() req: CustomRequest,
    @Body() subscribeWebhookDto: SubscribeWebhookDto,
  ): Promise<Webhook> {
    const user = req.user;
    return this.webhookService.subscribeWebhook(user, subscribeWebhookDto);
  }

  @Get()
  async getAllWebhooks(@Req() req: CustomRequest): Promise<Webhook[]> {
    const user = req.user;
    return this.webhookService.getAllWebhooks(user);
  }

  @Get('events')
  async getAllWebhookEvents(
    @Req() req: CustomRequest,
  ): Promise<WebhookEvent[]> {
    const user = req.user;
    return this.webhookService.getAllWebhookEvents(user);
  }

  @Post('event')
  async handleWebhookEvent(
    @Req() req: CustomRequest,
    @Body() webhookEventDto: WebhookEventDto,
  ): Promise<void> {
    const user = req.user;
    await this.webhookService.handleWebhookEvent(user, webhookEventDto);
  }

  @Delete(':id')
  async cancelSubscription(@Param('id') id: string): Promise<Webhook> {
    return this.webhookService.cancelSubscription(id);
  }
}
