import { Controller, Get, Put, Body, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';

interface UpdateWeightDto {
  weight: number;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  weight: number | null;
}

@Controller('users')
export class UserController {
  constructor(private readonly prisma: PrismaService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req: Request): Promise<UserProfile> {
    const user = await this.prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        name: true,
        email: true,
        weight: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Put('me/weight')
  async updateWeight(
    @Req() req: Request,
    @Body() data: UpdateWeightDto,
  ): Promise<UserProfile> {
    const user = await this.prisma.user.update({
      where: { id: req.user!.id },
      data: { weight: data.weight },
      select: {
        id: true,
        name: true,
        email: true,
        weight: true,
      },
    });

    return user;
  }
} 