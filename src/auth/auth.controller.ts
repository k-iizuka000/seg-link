import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('strava/callback')
  async handleStravaCallback(@Query('code') code: string): Promise<User> {
    return this.authService.handleStravaCallback(code);
  }

  @Get('strava/refresh')
  async handleStravaTokenRefresh(@Query('refresh_token') refreshToken: string): Promise<User> {
    return this.authService.refreshToken(refreshToken);
  }
}
