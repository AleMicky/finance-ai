import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { monthToRangeUTC, daysInMonthUTC } from './date.util';

type CategoryTotal = { category: string; total: number };

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async summary(userId: string, month: string) {
    const { from, to } = monthToRangeUTC(month);

    // 1) Totales por tipo (INCOME/EXPENSE)
    const totalsByType = await this.prisma.transaction.groupBy({
      by: ['type'],
      where: {
        userId,
        occurredAt: { gte: from, lt: to },
      },
      _sum: { amount: true },
    });

    const incomeTotal = Number(
      totalsByType.find((x) => x.type === 'INCOME')?._sum.amount ?? 0,
    );

    const expenseTotal = Number(
      totalsByType.find((x) => x.type === 'EXPENSE')?._sum.amount ?? 0,
    );

    // 2) Gastos por categoría
    const byCategoryRaw = await this.prisma.transaction.groupBy({
      by: ['category'],
      where: {
        userId,
        type: 'EXPENSE',
        occurredAt: { gte: from, lt: to },
      },
      _sum: { amount: true },
      orderBy: { _sum: { amount: 'desc' } },
    });

    const byCategory: CategoryTotal[] = byCategoryRaw.map((x) => ({
      category: x.category,
      total: Number(x._sum.amount ?? 0),
    }));

    // 3) Promedio diario de gasto (basado en días transcurridos del mes)
    const [year, monthStr] = month.split('-');
    const y = Number(year);
    const m = Number(monthStr); // 1..12
    const totalDays = daysInMonthUTC(y, m);

    const now = new Date();
    const nowUTC = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
    );
    const monthStartUTC = from;

    // días transcurridos dentro del mes consultado:
    let elapsedDays = totalDays;
    if (nowUTC < to && nowUTC >= monthStartUTC) {
      // Estamos dentro del mismo mes consultado
      elapsedDays = Math.max(1, nowUTC.getUTCDate()); // 1..today
    }

    const avgDailyExpense = expenseTotal / Math.max(1, elapsedDays);

    // 4) Días restantes (si el mes consultado es el actual)
    let daysRemaining = 0;
    if (nowUTC < to && nowUTC >= monthStartUTC) {
      daysRemaining = Math.max(0, totalDays - nowUTC.getUTCDate());
    }

    const balance = incomeTotal - expenseTotal;

    return {
      month,
      incomeTotal,
      expenseTotal,
      balance,
      byCategory,
      avgDailyExpense,
      daysRemaining,
    };
  }
}
