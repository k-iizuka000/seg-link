import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  private encryptToken(token: string): string {
    // TODO: Implement proper encryption using environment secret
    return Buffer.from(token).toString('base64');
  }

  private decryptToken(encryptedToken: string): string {
    // TODO: Implement proper decryption using environment secret
    return Buffer.from(encryptedToken, 'base64').toString('utf-8');
  }

  async storeStravaTokens(userId: string, accessToken: string, refreshToken: string) {
    const encryptedAccessToken = this.encryptToken(accessToken);
    const encryptedRefreshToken = this.encryptToken(refreshToken);
    
    return await this.prisma.stravaAuth.upsert({
      where: { userId },
      update: {
        accessToken: encryptedAccessToken,
        refreshToken: encryptedRefreshToken,
        expiresAt: new Date(Date.now() + 21600 * 1000), // 6 hours
      },
      create: {
        userId,
        accessToken: encryptedAccessToken,
        refreshToken: encryptedRefreshToken,
        expiresAt: new Date(Date.now() + 21600 * 1000), // 6 hours
        athleteId: 0, // Will be updated after first API call
        premium: false,
        summit: false,
        createdAtStrava: new Date(),
        updatedAtStrava: new Date(),
        badgeTypeId: 0,
      },
    });
  }

  async getStravaTokens(userId: string) {
    const stravaAuth = await this.prisma.stravaAuth.findUnique({
      where: { userId },
      select: {
        accessToken: true,
        refreshToken: true,
      },
    });
    return stravaAuth;
  }

  async refreshStravaToken(userId: string) {
    const stravaAuth = await this.prisma.stravaAuth.findUnique({
      where: { userId },
      select: {
        refreshToken: true,
      },
    });

    if (!stravaAuth || !stravaAuth.refreshToken) {
      throw new Error('Refresh token not found');
    }

    const decryptedRefreshToken = this.decryptToken(stravaAuth.refreshToken);
    
    // TODO: Implement actual Strava API call to refresh token
    const newTokens = {
      access_token: 'new_access_token',
      refresh_token: 'new_refresh_token',
      expires_in: 21600,
    };

    await this.storeStravaTokens(
      userId,
      newTokens.access_token,
      newTokens.refresh_token
    );

    return {
      accessToken: newTokens.access_token,
      refreshToken: newTokens.refresh_token,
      expiresIn: newTokens.expires_in,
    };
  }

  async validateStravaToken(token: string) {
    // TODO: Implement actual Strava API call to validate token
    // For now, just check if token exists and is not empty
    if (!token || token.trim().length === 0) {
      throw new Error('Invalid token');
    }
    return true;
  }

  async exchangeStravaCode(code: string) {
    const response = await axios.post('https://www.strava.com/oauth/token', null, {
      params: {
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code'
      }
    });
    const { access_token, refresh_token, athlete } = response.data;
    // Store tokens in the database
    await this.storeStravaTokens(athlete.id.toString(), access_token, refresh_token);
    return { access_token, refresh_token };
  }
}
