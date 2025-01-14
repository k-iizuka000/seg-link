import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('strava/login')
  async stravaLogin(@Res() res: Response) {
    const stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=${process.env.STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${process.env.STRAVA_REDIRECT_URI}&scope=read,activity:read_all`;
    res.redirect(stravaAuthUrl);
  }

  @Get('strava/callback')
  async stravaCallback(@Query('code') code: string) {
    // TODO-AUTH-1: Implement proper error handling and validation
    try {
      const tokens = await this.authService.exchangeStravaCode(code);
      return tokens;
    } catch (error) {
      throw error;
    }
  }

  @Get('strava/refresh')
  async refreshStravaToken(@Query('refresh_token') refreshToken: string) {
    // TODO-AUTH-1: Add authentication middleware and security checks
    try {
      const newTokens = await this.authService.refreshStravaToken(refreshToken);
      return newTokens;
    } catch (error) {
      throw error;
    }
  }
}
