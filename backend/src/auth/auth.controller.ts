import { Controller, Get, Query, Req, Res, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import axios from 'axios';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('strava/login')
  async stravaLogin(@Res() res: Response) {
    const stravaAuthUrl = `https://www.strava.com/oauth/authorize?client_id=${process.env.STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${process.env.STRAVA_CALLBACK_URL}&scope=read,activity:read_all`;
    res.redirect(stravaAuthUrl);
  }

  @Get('strava/callback')
  async stravaCallback(
    @Query('code') code: string,
    @Query('error') error: string,
    @Query('error_description') errorDescription: string,
  ) {
    if (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: error,
          message: errorDescription || 'Authentication failed',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!code) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Missing code',
          message: 'Authorization code is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const tokens = await this.authService.exchangeStravaCode(code);
      return tokens;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Token exchange failed',
            message: error.response?.data?.message || error.message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Token exchange failed',
          message: 'An unexpected error occurred',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('strava/refresh')
  async refreshStravaToken(@Query('refresh_token') refreshToken: string) {
    if (!refreshToken) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Missing refresh token',
          message: 'Refresh token is required',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const newTokens = await this.authService.refreshStravaToken(refreshToken);
      return newTokens;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Token refresh failed',
            message: error.response?.data?.message || error.message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Token refresh failed',
          message: 'An unexpected error occurred',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
