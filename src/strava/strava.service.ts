import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

interface StravaTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  athlete?: {
    id: number;
    firstname: string;
    lastname: string;
    email?: string;
  };
}

@Injectable()
export class StravaService {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly baseUrl = 'https://www.strava.com/api/v3';

  constructor(private readonly configService: ConfigService) {
    this.clientId = this.configService.get<string>('STRAVA_CLIENT_ID') || '';
    this.clientSecret = this.configService.get<string>('STRAVA_CLIENT_SECRET') || '';
  }

  async exchangeToken(code: string): Promise<StravaTokenResponse> {
    const response = await axios.post('https://www.strava.com/oauth/token', {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code,
      grant_type: 'authorization_code',
    });

    return response.data;
  }

  async refreshToken(refreshToken: string): Promise<StravaTokenResponse> {
    const response = await axios.post('https://www.strava.com/oauth/token', {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    });

    return response.data;
  }

  async getActivities(accessToken: string): Promise<any[]> {
    const response = await axios.get(`${this.baseUrl}/athlete/activities`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  }
} 