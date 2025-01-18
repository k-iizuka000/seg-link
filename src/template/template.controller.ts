import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import { Template } from '@prisma/client';

@Controller('templates')
export class TemplateController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Request() req): Promise<Template[]> {
    return this.prisma.template.findMany({
      where: { userId: req.user.id },
    });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Request() req, @Body() data: Omit<Template, 'id' | 'userId'>): Promise<Template> {
    return this.prisma.template.create({
      data: {
        ...data,
        userId: req.user.id,
      },
    });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() data: Omit<Template, 'id' | 'userId'>
  ): Promise<Template> {
    return this.prisma.template.update({
      where: {
        id,
        userId: req.user.id,
      },
      data,
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Request() req, @Param('id') id: string): Promise<Template> {
    return this.prisma.template.delete({
      where: {
        id,
        userId: req.user.id,
      },
    });
  }
}