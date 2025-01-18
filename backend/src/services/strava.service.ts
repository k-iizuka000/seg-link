import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  athlete: {
    id: string;
    name: string;
    email: string;
  };
}

@Injectable()
export class StravaService {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly redirectUri: string;

  constructor(private readonly configService: ConfigService) {
    this.clientId = this.configService.get<string>('STRAVA_CLIENT_ID')!;
    this.clientSecret = this.configService.get<string>('STRAVA_CLIENT_SECRET')!;
    this.redirectUri = this.configService.get<string>('STRAVA_REDIRECT_URI')!;
  }

  async getAuthorizationUrl(): Promise<string> {
    const scope = 'read,activity:read_all';
    return `https://www.strava.com/oauth/authorize?client_id=${this.clientId}&response_type=code&redirect_uri=${this.redirectUri}&scope=${scope}`;
  }

  async exchangeToken(code: string): Promise<TokenResponse> {
    const response = await axios.post<TokenResponse>('https://www.strava.com/oauth/token', {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code,
      grant_type: 'authorization_code',
    });

    return response.data;
  }

  async refreshToken(refreshToken: string): Promise<TokenResponse> {
    const response = await axios.post<TokenResponse>('https://www.strava.com/oauth/token', {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    });

    return response.data;
  }

  async getActivity(accessToken: string, activityId: string) {
    const response = await axios.get(`https://www.strava.com/api/v3/activities/${activityId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  }
} 