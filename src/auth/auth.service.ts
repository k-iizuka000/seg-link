import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { StravaService } from '../strava/strava.service';

interface StravaTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  athlete: {
    id: number;
    // ... other athlete properties
  };
}

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async saveStravaToken(
    userId: string, 
    accessToken: string, 
    refreshToken: string
  ): Promise<User> {
    return await this.prisma.user.update({
      where: { id: userId },
      data: {
        stravaAccessToken: accessToken,
        stravaRefreshToken: refreshToken,
        stravaTokenUpdatedAt: new Date(),
      },
    });
  }

  async getStravaToken(userId: string): Promise<{
    stravaAccessToken: string | null;
    stravaRefreshToken: string | null;
    stravaTokenUpdatedAt: Date | null;
  } | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        stravaAccessToken: true,
        stravaRefreshToken: true,
        stravaTokenUpdatedAt: true,
      },
    });
    return user;
  }

  async validateStravaToken(userId: string): Promise<boolean> {
    const user = await this.getStravaToken(userId);
    if (!user?.stravaAccessToken) return false;
    return true;
  }

  getStravaAuthUrl(): string {
    const clientId = process.env.STRAVA_CLIENT_ID;
    const redirectUri = process.env.STRAVA_CALLBACK_URL;
    const scope = 'read,activity:read_all';
    
    return `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&approval_prompt=force`;
  }

  async handleStravaCallback(code: string): Promise<{
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    athlete: StravaTokenResponse['athlete'];
  }> {
    const clientId = process.env.STRAVA_CLIENT_ID;
    const clientSecret = process.env.STRAVA_CLIENT_SECRET;
    
    try {
      const response = await axios.post<StravaTokenResponse>(
        'https://www.strava.com/oauth/token',
        {
          client_id: clientId,
          client_secret: clientSecret,
          code,
          grant_type: 'authorization_code'
        }
      );

      return {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        expiresAt: response.data.expires_at,
        athlete: response.data.athlete
      };
    } catch (error) {
      throw new Error(`Strava token exchange failed: ${error.response?.data?.message || error.message}`);
    }
  }
}
