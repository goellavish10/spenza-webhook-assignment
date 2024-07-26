import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Webhook, WebhookSchema } from 'src/schemas/Webhook.schema';
import { BullModule } from '@nestjs/bullmq';
import {
  WebhookEvent,
  WebhookEventSchema,
} from 'src/schemas/WebhookEvent.schema';
import { HttpModule } from '@nestjs/axios';
import { WebhookProcessor } from './webhook.processor';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Webhook.name,
        schema: WebhookSchema,
      },
      {
        name: WebhookEvent.name,
        schema: WebhookEventSchema,
      },
    ]),
    BullModule.registerQueue({
      name: 'webhook-events-queue',
    }),
    BullModule.registerQueue({
      name: 'failed-webhook-events-queue',
    }),
    HttpModule,
  ],
  controllers: [WebhookController],
  providers: [WebhookService, WebhookProcessor],
})
export class WebhookModule {}
