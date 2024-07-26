import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class WebhookEvent {
  @Prop({ required: true })
  source: string;

  @Prop({ type: Object, required: true })
  payload: Record<string, any>;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: string;

  @Prop({ type: Types.ObjectId, ref: 'Webhook', required: true })
  webhook: string;

  @Prop({ default: Date.now })
  @IsOptional()
  createdAt?: Date;

  @Prop()
  @IsOptional()
  updatedAt?: Date;
}

export const WebhookEventSchema = SchemaFactory.createForClass(WebhookEvent);
