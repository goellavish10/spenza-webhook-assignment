import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsOptional } from 'class-validator';

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Date.now })
  @IsOptional()
  createdAt?: Date;

  @Prop()
  @IsOptional()
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
