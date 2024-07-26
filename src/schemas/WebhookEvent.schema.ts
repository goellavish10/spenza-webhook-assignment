import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';

@Schema({ timestamps: true })
export class WebhookEvent {
  @Prop({ required: true })
  source: string;

  @Prop({ type: Object, required: true })
  payload: Record<string, any>;

  @Prop({ default: Date.now })
  @IsOptional()
  createdAt?: Date;

  @Prop()
  @IsOptional()
  updatedAt?: Date;
}

export const WebhookEventSchema = SchemaFactory.createForClass(WebhookEvent);
