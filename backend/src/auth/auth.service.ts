import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import jwt from 'jsonwebtoken';
import { StravaTokenResponse } from '../types/strava';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async handleStravaCallback(code: string): Promise<User> {
    const tokenResponse = await this.getStravaToken(code);
    const { athlete } = tokenResponse;

    const existingUser = await this.prisma.user.findUnique({
      where: { stravaId: athlete.id.toString() },
    });

    if (existingUser) {
      const user = await this.prisma.user.update({
        where: { id: existingUser.id },
        data: {
          accessToken: tokenResponse.access_token,
          refreshToken: tokenResponse.refresh_token,
          tokenExpiresAt: new Date(tokenResponse.expires_at * 1000),
        },
      });
      return user;
    }

    const user = await this.prisma.user.create({
      data: {
        stravaId: athlete.id.toString(),
        name: `${athlete.firstname} ${athlete.lastname}`,
        email: athlete.email,
        accessToken: tokenResponse.access_token,
        refreshToken: tokenResponse.refresh_token,
        tokenExpiresAt: new Date(tokenResponse.expires_at * 1000),
      },
    });

    return user;
  }

  private async getStravaToken(code: string): Promise<StravaTokenResponse> {
    const response = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get Strava token');
    }

    return response.json();
  }

  generateToken(user: User): string {
    return jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });
  }

  verifyToken(token: string): { userId: string } {
    return jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
  }
}
