import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';

interface CreateTemplateDto {
  name: string;
  clothing: string;
  wheels: string;
  wind: string;
  weight: number;
  notes?: string;
}

interface UpdateTemplateDto {
  name?: string;
  clothing?: string;
  wheels?: string;
  wind?: string;
  weight?: number;
  notes?: string;
}

@Controller('templates')
export class TemplateController {
  constructor(private readonly prisma: PrismaService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req: Request) {
    return this.prisma.template.findMany({
      where: { userId: req.user!.id },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: Request, @Body() data: CreateTemplateDto) {
    return this.prisma.template.create({
      data: {
        ...data,
        userId: req.user!.id,
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() data: UpdateTemplateDto,
  ) {
    return this.prisma.template.update({
      where: {
        id,
        userId: req.user!.id,
      },
      data,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    return this.prisma.template.delete({
      where: {
        id,
        userId: req.user!.id,
      },
    });
  }
} 