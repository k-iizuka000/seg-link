import { Worker } from 'bullmq';
import { PrismaService } from '../prisma/prisma.service';
import { StravaService } from '../strava/strava.service';
import { Logger } from '@nestjs/common';

interface ActivitySyncJob {
  userId: string;
}

interface StravaActivity {
  id: string;
  name: string;
  type: string;
  start_date: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
}

export class ActivitySyncWorker {
  private readonly logger = new Logger(ActivitySyncWorker.name);
  private readonly worker: Worker;

  constructor(
    private readonly prisma: PrismaService,
    private readonly stravaService: StravaService,
  ) {
    this.worker = new Worker('activity-sync', this.processJob.bind(this));
  }

  private async processJob(job: ActivitySyncJob): Promise<void> {
    if (!job.userId) {
      this.logger.error('Missing userId in job data');
      throw new Error('Invalid job data: userId is required');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: job.userId },
    });

    if (!user?.stravaId || !user?.accessToken || !user?.refreshToken) {
      this.logger.error(`User not found or missing Strava credentials for userId: ${job.userId}`);
      throw new Error('Invalid user data: Strava credentials missing');
    }

    try {
      const refreshedToken = await this.stravaService.refreshToken(user.refreshToken);
      if (!refreshedToken?.accessToken) {
        throw new Error('Failed to refresh Strava token');
      }

      const activities = await this.stravaService.getActivities(refreshedToken.accessToken);
      if (!Array.isArray(activities)) {
        throw new Error('Invalid activities response from Strava');
      }

      await Promise.all(activities.map(async (activity: StravaActivity) => {
        if (!activity?.id) {
          this.logger.warn('Skipping activity with missing ID');
          return;
        }

        await this.prisma.activity.upsert({
          where: {
            stravaActivityId: activity.id,
          },
          create: {
            userId: user.id,
            stravaActivityId: activity.id,
            name: activity.name || 'Unnamed Activity',
            type: activity.type,
            startDate: new Date(activity.start_date),
            distance: activity.distance,
            movingTime: activity.moving_time,
            elapsedTime: activity.elapsed_time,
            averageSpeedMps: activity.average_speed,
          },
          update: {
            name: activity.name || 'Unnamed Activity',
            type: activity.type,
            startDate: new Date(activity.start_date),
            distance: activity.distance,
            movingTime: activity.moving_time,
            elapsedTime: activity.elapsed_time,
            averageSpeedMps: activity.average_speed,
          },
        });
      }));
    } catch (error) {
      this.logger.error('Error syncing activities:', error);
      throw error;
    }
  }
}