import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async findUserByStravaId(stravaId: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { stravaId },
    });
  }

  async upsertUser(athlete: any): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        stravaId: athlete.id.toString(),
      },
    });

    if (existingUser) {
      return this.prisma.user.update({
        where: {
          stravaId: athlete.id.toString(),
        },
        data: {
          name: athlete.name,
          email: athlete.email,
          accessToken: athlete.access_token,
          refreshToken: athlete.refresh_token,
          tokenExpiresAt: new Date(athlete.expires_at * 1000),
        },
      });
    }

    return this.prisma.user.create({
      data: {
        stravaId: athlete.id.toString(),
        name: athlete.name,
        email: athlete.email,
        accessToken: athlete.access_token,
        refreshToken: athlete.refresh_token,
        tokenExpiresAt: new Date(athlete.expires_at * 1000),
      },
    });
  }

  async generateToken(user: User): Promise<string> {
    const payload = { userId: user.id };
    return this.jwtService.sign(payload);
  }

  async validateUser(userId: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async refreshToken(userId: string): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return this.generateToken(user);
  }

  async updateUserWeight(userId: string, weight: number): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: { weight },
    });
  }
} 