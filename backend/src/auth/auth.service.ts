import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import axios from 'axios';
import * as crypto from 'crypto';
import { StravaTokenResponse } from '../types/strava';

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

  async storeStravaTokens(userId: number, accessToken: string, refreshToken: string, expiresAt: Date, athleteId: number) {
    try {
      const encryptedAccessToken = this.encryptToken(accessToken);
      const encryptedRefreshToken = this.encryptToken(refreshToken);
      
      const result = await this.prisma.stravaAuth.upsert({
        where: { userId },
        update: {
          accessToken: encryptedAccessToken,
          refreshToken: encryptedRefreshToken,
          expiresAt,
          athleteId,
        },
        create: {
          userId,
          accessToken: encryptedAccessToken,
          refreshToken: encryptedRefreshToken,
          expiresAt,
          athleteId,
          premium: false,
          summit: false,
          createdAtStrava: new Date(),
          updatedAtStrava: new Date(),
          badgeTypeId: 0,
        },
      });
      
      console.log('Strava tokens stored successfully:', {
        userId,
        athleteId,
        expiresAt
      });
      
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error storing Strava tokens:', error);
        throw new Error(`Failed to store Strava tokens: ${error.message}`);
      }
      console.error('Unknown error storing Strava tokens:', error);
      throw new Error('Failed to store Strava tokens');
    }
  }

  async getStravaTokens(userId: number) {
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

  async refreshStravaToken(userId: number) {
    const stravaAuth = await this.prisma.stravaAuth.findUnique({
      where: { userId },
      select: {
        refreshToken: true,
        athleteId: true,
      },
    });

    if (!stravaAuth || !stravaAuth.refreshToken) {
      throw new Error('Refresh token not found');
    }

    const decryptedRefreshToken = this.decryptToken(stravaAuth.refreshToken);
    
    const response = await axios.post<StravaTokenResponse>('https://www.strava.com/oauth/token', {
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
      new Date(expires_at * 1000),
      stravaAuth.athleteId
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
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return false;
      }
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unknown error validating Strava token');
    }
  }

  async exchangeStravaCode(code: string) {
    let response;
    try {
      console.log('Exchanging Strava code:', code);
      console.log('Using client ID:', process.env.STRAVA_CLIENT_ID);
      console.log('Using client secret:', process.env.STRAVA_CLIENT_SECRET?.substring(0, 4) + '****');
      console.log('TEST LOG: This is a test log message');
      
      const params = new URLSearchParams();
      params.append('client_id', process.env.STRAVA_CLIENT_ID || '');
      params.append('client_secret', process.env.STRAVA_CLIENT_SECRET || '');
      params.append('code', code);
      params.append('grant_type', 'authorization_code');

      response = await axios.post<StravaTokenResponse>('https://www.strava.com/oauth/token', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      console.log('Strava token exchange successful:', response.data);
    } catch (error: unknown) {
      console.error('Strava token exchange failed:', error);
      if (axios.isAxiosError(error)) {
        console.error('Strava API error details:', {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            params: error.config?.params,
            headers: error.config?.headers
          }
        });
        throw new Error(`Token exchange failed: ${error.response?.data?.message || error.message}`);
      }
      if (error instanceof Error) {
        throw new Error(`Token exchange failed: ${error.message}`);
      }
      throw new Error('Unknown error during token exchange');
    }

    const { access_token, refresh_token, expires_at, athlete } = response.data;
    let user;
    let stravaAuth;

    try {
      console.log('Creating/updating user with email:', athlete.email);
      
      // Create or update user
      user = await this.prisma.user.upsert({
        where: { stravaId: athlete.id },
        update: {
          name: athlete.firstname + ' ' + athlete.lastname,
        },
        create: {
          stravaId: athlete.id,
          name: athlete.firstname + ' ' + athlete.lastname,
        },
      });

      console.log('User created/updated successfully:', user);

      // Store tokens
      console.log('Storing Strava tokens for user:', user.id);
      const stravaAuth = await this.storeStravaTokens(
        user.id,
        access_token,
        refresh_token,
        new Date(expires_at * 1000),
        athlete.id
      );

      console.log('Strava tokens stored successfully:', stravaAuth);
    } catch (error) {
      console.error('Error during user creation/token storage:', error);
      throw error;
    }

    const result = {
      user: user,
      stravaAuth: stravaAuth,
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresAt: new Date(expires_at * 1000),
    };
    
    console.log('Returning exchange result:', result);
    return result;
  }
}
