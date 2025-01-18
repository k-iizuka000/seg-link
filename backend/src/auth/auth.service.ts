import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  private encryptToken(token: string): string {
    const algorithm = 'aes-256-cbc';
    const key = Buffer.from(process.env.TOKEN_ENCRYPTION_KEY || '', 'hex');
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(token, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
  }

  private decryptToken(encryptedToken: string): string {
    const algorithm = 'aes-256-cbc';
    const key = Buffer.from(process.env.TOKEN_ENCRYPTION_KEY || '', 'hex');
    const [ivHex, encryptedHex] = encryptedToken.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  async storeStravaTokens(userId: string, accessToken: string, refreshToken: string, expiresAt: Date) {
    const encryptedAccessToken = this.encryptToken(accessToken);
    const encryptedRefreshToken = this.encryptToken(refreshToken);
    
    return await this.prisma.stravaAuth.upsert({
      where: { userId },
      update: {
        accessToken: encryptedAccessToken,
        refreshToken: encryptedRefreshToken,
        expiresAt,
      },
      create: {
        userId,
        accessToken: encryptedAccessToken,
        refreshToken: encryptedRefreshToken,
        expiresAt,
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
        expiresAt: true,
      },
    });

    if (!stravaAuth) {
      return null;
    }

    return {
      accessToken: this.decryptToken(stravaAuth.accessToken),
      refreshToken: this.decryptToken(stravaAuth.refreshToken),
      expiresAt: stravaAuth.expiresAt,
    };
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
    
    const response = await axios.post('https://www.strava.com/oauth/token', {
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      refresh_token: decryptedRefreshToken,
      grant_type: 'refresh_token',
    });

    const { access_token, refresh_token, expires_at } = response.data;
    await this.storeStravaTokens(
      userId,
      access_token,
      refresh_token,
      new Date(expires_at * 1000)
    );

    return {
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresAt: new Date(expires_at * 1000),
    };
  }

  async validateStravaToken(token: string): Promise<boolean> {
    try {
      await axios.get('https://www.strava.com/api/v3/athlete', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return true;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return false;
      }
      throw error;
    }
  }

  async exchangeStravaCode(code: string) {
    const response = await axios.post('https://www.strava.com/oauth/token', {
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
    });

    const { access_token, refresh_token, expires_at, athlete } = response.data;
    await this.storeStravaTokens(
      athlete.id.toString(),
      access_token,
      refresh_token,
      new Date(expires_at * 1000)
    );

    return {
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresAt: new Date(expires_at * 1000),
      athlete,
    };
  }
}
