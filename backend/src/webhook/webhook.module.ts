import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule } from '@nestjs/config';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

@Module({
  imports: [
    ConfigModule,
    BullModule.registerQueue({
      name: 'activity-sync',
    }),
  ],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {} 