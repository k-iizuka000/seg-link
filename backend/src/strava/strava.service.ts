import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StravaService {
  private readonly logger = new Logger(StravaService.name);
  private readonly baseUrl = 'https://www.strava.com/api/v3';

  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService
  ) {}

  async getActivity(activityId: number, athleteId: number) {
    const user = await this.prisma.user.findUnique({
      where: { stravaId: athleteId.toString() },
    });

    if (!user) {
      throw new Error(`User ${athleteId} not found`);
    }

    try {
      const response = await axios.get(`${this.baseUrl}/activities/${activityId}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        // Token expired, refresh and retry
        const newToken = await this.refreshToken(user.id);
        const response = await axios.get(`${this.baseUrl}/activities/${activityId}`, {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        });
        return response.data;
      }
      throw error;
    }
  }

  async getSegment(segmentId: number, athleteId: number) {
    const user = await this.prisma.user.findUnique({
      where: { stravaId: athleteId.toString() },
    });

    if (!user) {
      throw new Error(`User ${athleteId} not found`);
    }

    try {
      const response = await axios.get(`${this.baseUrl}/segments/${segmentId}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        // Token expired, refresh and retry
        const newToken = await this.refreshToken(user.id);
        const response = await axios.get(`${this.baseUrl}/segments/${segmentId}`, {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        });
        return response.data;
      }
      throw error;
    }
  }

  private async refreshToken(userId: string): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.refreshToken) {
      throw new Error('User not found or refresh token missing');
    }

    const response = await axios.post('https://www.strava.com/oauth/token', {
      client_id: this.config.get('STRAVA_CLIENT_ID'),
      client_secret: this.config.get('STRAVA_CLIENT_SECRET'),
      refresh_token: user.refreshToken,
      grant_type: 'refresh_token',
    });

    const { access_token, refresh_token, expires_at } = response.data;

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        accessToken: access_token,
        refreshToken: refresh_token,
        tokenExpiresAt: new Date(expires_at * 1000),
      },
    });

    return access_token;
  }
} 