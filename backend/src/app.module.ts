import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PrismaModule } from './prisma/prisma.module';
import { TemplatesController } from './templates/templates.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        '../../../.env',
        '.env',
        '../.env',
        '../../.env'
      ],
    }),
    PrismaModule,
  ],
  controllers: [AuthController, TemplatesController],
  providers: [AuthService],
})
export class AppModule {}
