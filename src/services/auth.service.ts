import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StravaService } from '../strava/strava.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stravaService: StravaService,
    private readonly jwtService: JwtService,
  ) {}

  async handleStravaCallback(code: string): Promise<User> {
    const { athlete, access_token, refresh_token, expires_at } = await this.stravaService.exchangeToken(code);
    
    let user = await this.prisma.user.findUnique({
      where: { stravaId: athlete.id.toString() },
    });

    if (!user) {
      const athleteName = `${athlete.firstname} ${athlete.lastname}`;
      user = await this.prisma.user.create({
        data: {
          stravaId: athlete.id.toString(),
          name: athleteName,
          email: athlete.email ?? null,
          accessToken: access_token,
          refreshToken: refresh_token,
          tokenExpiresAt: new Date(expires_at * 1000),
        },
      });
    } else {
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: {
          accessToken: access_token,
          refreshToken: refresh_token,
          tokenExpiresAt: new Date(expires_at * 1000),
        },
      });
    }

    return user;
  }

  async handleStravaTokenRefresh(refreshToken: string): Promise<User> {
    const { access_token, refresh_token, expires_at } = await this.stravaService.refreshToken(refreshToken);
    
    const user = await this.prisma.user.update({
      where: { refreshToken },
      data: {
        accessToken: access_token,
        refreshToken: refresh_token,
        tokenExpiresAt: new Date(expires_at * 1000),
      },
    });

    return user;
  }
} 