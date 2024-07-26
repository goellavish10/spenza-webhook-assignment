import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';

@Schema({ timestamps: true })
export class Webhook {
  @Prop({ required: true })
  source: string;

  @Prop({ required: true })
  callbackUrl: string;

  @Prop({ default: Date.now })
  @IsOptional()
  createdAt?: Date;

  @Prop()
  @IsOptional()
  updatedAt?: Date;
}
export const WebhookSchema = SchemaFactory.createForClass(Webhook);
