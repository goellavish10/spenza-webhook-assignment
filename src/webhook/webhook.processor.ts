import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { WebhookService } from './webhook.service';

@Processor('webhook-events-queue')
export class WebhookProcessor extends WorkerHost {
  constructor(private readonly webhookService: WebhookService) {
    super();
  }

  async process(job: Job): Promise<any> {
    await this.webhookService.processWebhook(job);
  }
}

@Processor('failed-webhook-events-queue')
export class FailedWebhookProcessor {
  constructor(private readonly webhookService: WebhookService) {}

  async retryWebhook(job: Job) {
    await this.webhookService.processWebhook(job);
  }
}
