import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class StravaService {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly redirectUri: string;

  constructor(private configService: ConfigService) {
    this.clientId = this.configService.get<string>('STRAVA_CLIENT_ID') || '';
    this.clientSecret = this.configService.get<string>('STRAVA_CLIENT_SECRET') || '';
    this.redirectUri = this.configService.get<string>('STRAVA_REDIRECT_URI') || '';
  }

  getAuthUrl(): string {
    const scope = 'read,activity:read_all';
    return `https://www.strava.com/oauth/authorize?client_id=${this.clientId}&response_type=code&redirect_uri=${this.redirectUri}&scope=${scope}`;
  }

  async exchangeToken(code: string) {
    try {
      const response = await axios.post('https://www.strava.com/oauth/token', {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code,
        grant_type: 'authorization_code',
      });

      return response.data;
    } catch (error) {
      console.error('Error exchanging token:', error);
      throw error;
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      const response = await axios.post('https://www.strava.com/oauth/token', {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      });

      return response.data;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }
} 