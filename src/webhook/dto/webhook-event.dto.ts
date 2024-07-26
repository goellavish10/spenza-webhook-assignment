import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class WebhookEventDto {
  @IsString()
  @IsNotEmpty()
  source: string;

  @IsObject()
  @IsNotEmpty()
  payload: Record<string, any>;
}
