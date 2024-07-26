import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Webhook {
  @Prop({ required: true })
  source: string;

  @Prop({ required: true })
  callbackUrl: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: string;

  @Prop({ default: Date.now })
  @IsOptional()
  createdAt?: Date;

  @Prop()
  @IsOptional()
  updatedAt?: Date;
}
export const WebhookSchema = SchemaFactory.createForClass(Webhook);
