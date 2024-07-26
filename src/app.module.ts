import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WebhookModule } from './webhook/webhook.module';
import { BullModule } from '@nestjs/bullmq';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/webhook-assignment'),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    UsersModule,
    AuthModule,
    WebhookModule,
    HttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
