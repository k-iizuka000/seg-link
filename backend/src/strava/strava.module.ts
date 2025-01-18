import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { StravaService } from './strava.service';

@Module({
  imports: [ConfigModule, PrismaModule],
  providers: [StravaService],
  exports: [StravaService],
})
export class StravaModule {} 