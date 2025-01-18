import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';

@Injectable()
export class WebhookService {
  constructor(
    @InjectQueue('activity-sync') private activitySyncQueue: Queue
  ) {}

  async handleStravaEvent(event: StravaWebhookEvent) {
    if (event.object_type === 'activity') {
      await this.handleActivityEvent(event);
    }
  }

  private async handleActivityEvent(event: StravaWebhookEvent) {
    const jobData = {
      activityId: event.object_id,
      athleteId: event.owner_id,
      eventType: event.aspect_type,
      updates: event.updates,
    };

    const jobOptions = {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
    };

    await this.activitySyncQueue.add('sync-activity', jobData, jobOptions);
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