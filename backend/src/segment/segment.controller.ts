import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';

interface SearchQuery {
  clothing?: string;
  wheels?: string;
  wind?: string;
  weight?: number;
}

interface SearchResult {
  id: string;
  name: string;
  distance: number;
  averageGrade: number;
  maximumGrade: number;
  elevationDifference: number;
  clothing?: string | null;
  wheels?: string | null;
  wind?: string | null;
  weight?: number | null;
}

interface SegmentWithActivity {
  id: string;
  name: string;
  distance: number;
  averageGrade: number;
  maximumGrade: number;
  elevationDifference: number;
  activities: Array<{
    clothing: string | null;
    wheels: string | null;
    wind: string | null;
    weight: number | null;
  }>;
}

@Controller('segments')
export class SegmentController {
  constructor(private readonly prisma: PrismaService) {}

  @UseGuards(JwtAuthGuard)
  @Get('search')
  async search(@Query() query: SearchQuery): Promise<SearchResult[]> {
    const { clothing, wheels, wind, weight } = query;

    const segments = await this.prisma.segment.findMany({
      where: {
        activities: {
          some: {
            clothing: clothing || undefined,
            wheels: wheels || undefined,
            wind: wind || undefined,
            weight: weight || undefined,
          },
        },
      },
      select: {
        id: true,
        name: true,
        distance: true,
        averageGrade: true,
        maximumGrade: true,
        elevationDifference: true,
        activities: {
          where: {
            clothing: clothing || undefined,
            wheels: wheels || undefined,
            wind: wind || undefined,
            weight: weight || undefined,
          },
          select: {
            clothing: true,
            wheels: true,
            wind: true,
            weight: true,
          },
          take: 1,
        },
      },
    }) as SegmentWithActivity[];

    return segments.map((segment) => ({
      id: segment.id,
      name: segment.name,
      distance: segment.distance,
      averageGrade: segment.averageGrade,
      maximumGrade: segment.maximumGrade,
      elevationDifference: segment.elevationDifference,
      clothing: segment.activities[0]?.clothing,
      wheels: segment.activities[0]?.wheels,
      wind: segment.activities[0]?.wind,
      weight: segment.activities[0]?.weight,
    }));
  }
} 