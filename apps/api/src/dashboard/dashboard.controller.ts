import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { DashboardService } from './dashboard.service';
import { AiService } from '../ai/ai.service';
import { CurrentUser } from '../auth/current-user.decorator';
import type { AuthUser } from '../auth/auth.types';
import { DashboardQueryDto } from './dto/dashboard-query.dto';

@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly dashboard: DashboardService,
    private readonly ai: AiService,
  ) {}

  @Get()
  async getSummary(
    @CurrentUser() user: AuthUser,
    @Query() q: DashboardQueryDto,
  ) {
    return this.dashboard.summary(user.userId, q.month);
  }

  @Get('insights')
  async getInsights(
    @CurrentUser() user: AuthUser,
    @Query() q: DashboardQueryDto,
  ) {
    const summary = await this.dashboard.summary(user.userId, q.month);

    const topCategories = summary.byCategory
      .slice(0, 5)
      .map((x) => `${x.category}=${x.total.toFixed(2)}`)
      .join(', ');

    const insights = await this.ai.insights({
      month: summary.month,
      incomeTotal: summary.incomeTotal,
      expenseTotal: summary.expenseTotal,
      avgDailyExpense: summary.avgDailyExpense,
      daysRemaining: summary.daysRemaining,
      topCategories: topCategories || 'Sin gastos registrados.',
    });

    return { summary, insights };
  }
}
