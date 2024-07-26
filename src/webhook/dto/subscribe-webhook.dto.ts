import { IsUrl, IsString, IsNotEmpty } from 'class-validator';

export class SubscribeWebhookDto {
  @IsString()
  @IsNotEmpty()
  source: string;

  @IsUrl()
  @IsNotEmpty()
  callbackUrl: string;
}
