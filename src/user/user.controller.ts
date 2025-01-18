import { Controller, Get, Put, UseGuards, Request, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private prisma: PrismaService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id: req.user.id },
    });
  }

  @Put('me/weight')
  @UseGuards(JwtAuthGuard)
  async updateWeight(
    @Request() req,
    @Body('weight') weight: number
  ): Promise<User> {
    return this.prisma.user.update({
      where: { id: req.user.id },
      data: { weight },
    });
  }
}