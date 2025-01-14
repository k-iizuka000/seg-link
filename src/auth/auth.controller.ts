import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // TODO: QA.md - Implement Strava OAuth flow
  @Get('strava/login')
  async stravaLogin(@Res() res: Response) {
    const stravaAuthUrl = this.authService.getStravaAuthUrl();
    res.redirect(stravaAuthUrl);
  }

  // TODO: QA.md - Handle Strava OAuth callback
  @Get('strava/callback')
  async stravaCallback(
    @Query('code') code: string,
    @Query('error') error: string,
  ) {
    if (error) {
      throw new Error('Authentication failed');
    }
    
    return this.authService.handleStravaCallback(code);
  }

  // TODO: QA.md - Implement token refresh endpoint
  @Get('refresh')
  async refreshToken(@Req() req: Request) {
    return this.authService.refreshToken(req);
  }

  @Get('test/callback')
  async testCallback() {
    const testCode = 'test_code';
    return this.authService.handleStravaCallback(testCode);
  }
}
