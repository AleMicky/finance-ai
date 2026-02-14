import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TxnsService } from './txns.service';
import { Category, CreateTxnDto, QueryTxnsDto, TxnType } from './dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import type { AuthUser } from '../auth/auth.types';
import { QuickTxnDto } from './dto/quick-txn.dto';
import { AiService } from '../ai/ai.service';

@UseGuards(JwtAuthGuard)
@Controller('txns')
export class TxnsController {
  constructor(
    private readonly txnsService: TxnsService,
    private readonly ai: AiService,
  ) {}

  @Post()
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateTxnDto) {
    return this.txnsService.create(user.userId, dto);
  }

  @Post('quick')
  async quick(@CurrentUser() user: AuthUser, @Body() dto: QuickTxnDto) {
    const cls = await this.ai.classify(dto.text);

    // occurredAt: hoy por defecto
    const occurredAt = new Date().toISOString();

    return this.txnsService.create(user.userId, {
      type: cls.type as TxnType,
      category: cls.category as Category, // si tus enums son DTO enums, te lo tipamos mejor luego
      amount: cls.amount ?? 0,
      description: cls.note,
      occurredAt,
    });
  }
  @Get()
  findMany(@CurrentUser() user: AuthUser, @Query() q: QueryTxnsDto) {
    return this.txnsService.findMany(user.userId, q);
  }

  @Delete(':id')
  remove(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.txnsService.remove(user.userId, id);
  }
}
