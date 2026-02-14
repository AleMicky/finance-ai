import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { AiService } from './ai.service';
import { ClassifyDto, InsightsDto } from './dto';
import { Throttle } from '@nestjs/throttler';

@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {
  constructor(private readonly ai: AiService) {}

  @Throttle({ ai: { ttl: 60_000, limit: 20 } })
  @Post('classify')
  classify(@Body() dto: ClassifyDto) {
    return this.ai.classify(dto.text);
  }

  @Post('insights')
  insights(@Body() dto: InsightsDto) {
    return this.ai.insights(dto);
  }
}
