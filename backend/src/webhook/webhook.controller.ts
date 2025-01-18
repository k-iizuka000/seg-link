import { Controller, Get, Post, Query, Body, Headers } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(
    private readonly webhookService: WebhookService,
    private readonly config: ConfigService
  ) {}

  @Get('strava')
  async verifyWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string
  ) {
    if (mode === 'subscribe' && token === this.config.get('STRAVA_WEBHOOK_VERIFY_TOKEN')) {
      return { 'hub.challenge': challenge };
    }
    throw new Error('Invalid webhook verification request');
  }

  @Post('strava')
  async handleWebhook(
    @Headers('x-strava-webhook-subscription-id') subscriptionId: string,
    @Body() event: StravaWebhookEvent
  ) {
    await this.webhookService.handleStravaEvent(event);
    return { status: 'ok' };
  }
}

interface StravaWebhookEvent {
  object_type: 'activity' | 'athlete';
  object_id: number;
  aspect_type: 'create' | 'update' | 'delete';
  owner_id: number;
  subscription_id: number;
  event_time: number;
  updates?: {
    title?: string;
    type?: string;
    private?: boolean;
  };
} 