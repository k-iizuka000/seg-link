import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../services/auth.service';
import { StravaService } from '../services/strava.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

declare global {
  namespace Express {
    interface User {
      id: string;
    }
  }
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly stravaService: StravaService,
  ) {}

  @Get('strava')
  async getStravaAuthUrl() {
    const url = await this.stravaService.getAuthorizationUrl();
    return { url };
  }

  @Get('strava/callback')
  async handleStravaCallback(@Query('code') code: string) {
    try {
      const tokenData = await this.stravaService.exchangeToken(code);
      const user = await this.authService.upsertUser(tokenData.athlete);
      const jwt = await this.authService.generateToken(user);

      return {
        token: jwt,
      };
    } catch (error) {
      console.error('Failed to handle Strava callback:', error);
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('strava/status')
  async getStravaStatus(@Req() req: Request) {
    const user = await this.authService.validateUser(req.user!.id);
    if (!user) {
      throw new Error('User not found');
    }

    return {
      connected: true,
      lastSync: user.tokenExpiresAt,
      activityCount: 0, // TODO: 実際のアクティビティ数を取得
    };
  }
} 