import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { StravaService } from '../strava/strava.service';
import { PrismaService } from '../prisma/prisma.service';

@Processor('activity-sync')
export class ActivitySyncWorker extends WorkerHost {
  private readonly logger = new Logger(ActivitySyncWorker.name);

  constructor(
    private readonly stravaService: StravaService,
    private readonly prisma: PrismaService
  ) {
    super();
  }

  async process(job: Job<ActivitySyncJobData, any, string>): Promise<void> {
    this.logger.debug(`Processing activity sync job ${job.id}`);
    const { activityId, athleteId, eventType } = job.data;

    try {
      switch (eventType) {
        case 'create':
        case 'update':
          await this.handleActivityUpdate(activityId, athleteId);
          break;
        case 'delete':
          await this.handleActivityDelete(activityId);
          break;
      }
    } catch (error) {
      this.logger.error(`Failed to process activity sync job ${job.id}:`, error);
      throw error;
    }
  }

  private async handleActivityUpdate(activityId: number, athleteId: number) {
    const activity = await this.stravaService.getActivity(activityId, athleteId);
    
    if (!activity) {
      throw new Error(`Activity ${activityId} not found`);
    }

    await this.prisma.activity.upsert({
      where: { stravaId: activityId.toString() },
      update: {
        name: activity.name,
        distance: activity.distance,
        movingTime: activity.moving_time,
        elapsedTime: activity.elapsed_time,
        totalElevationGain: activity.total_elevation_gain,
        type: activity.type,
        startDate: new Date(activity.start_date),
        averageSpeed: activity.average_speed,
        maxSpeed: activity.max_speed,
        averageWatts: activity.average_watts,
        kilojoules: activity.kilojoules,
        averageHeartrate: activity.average_heartrate,
        maxHeartrate: activity.max_heartrate,
      },
      create: {
        stravaId: activityId.toString(),
        userId: athleteId.toString(),
        name: activity.name,
        distance: activity.distance,
        movingTime: activity.moving_time,
        elapsedTime: activity.elapsed_time,
        totalElevationGain: activity.total_elevation_gain,
        type: activity.type,
        startDate: new Date(activity.start_date),
        averageSpeed: activity.average_speed,
        maxSpeed: activity.max_speed,
        averageWatts: activity.average_watts,
        kilojoules: activity.kilojoules,
        averageHeartrate: activity.average_heartrate,
        maxHeartrate: activity.max_heartrate,
      },
    });
  }

  private async handleActivityDelete(activityId: number) {
    await this.prisma.activity.delete({
      where: { stravaId: activityId.toString() },
    });
  }
}

interface ActivitySyncJobData {
  activityId: number;
  athleteId: number;
  eventType: 'create' | 'update' | 'delete';
  updates?: {
    title?: string;
    type?: string;
    private?: boolean;
  };
} 