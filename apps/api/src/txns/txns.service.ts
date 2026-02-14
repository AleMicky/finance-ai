import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTxnDto, QueryTxnsDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';

function monthRange(month: string): { from: Date; to: Date } {
  // month: "YYYY-MM"
  const m = month.trim();
  if (!/^\d{4}-\d{2}$/.test(m))
    throw new BadRequestException('month debe ser YYYY-MM');

  const [y, mm] = m.split('-').map(Number);
  const from = new Date(Date.UTC(y, mm - 1, 1, 0, 0, 0));
  const to = new Date(Date.UTC(y, mm, 1, 0, 0, 0)); // 1er día del mes siguiente
  return { from, to };
}

@Injectable()
export class TxnsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ai: AiService,
  ) {}

  async create(userId: string, dto: CreateTxnDto) {
    const occurredAt = new Date(dto.occurredAt);

    if (Number.isNaN(occurredAt.getTime())) {
      throw new BadRequestException('occurredAt inválido');
    }

    const tx = await this.prisma.transaction.create({
      data: {
        type: dto.type,
        category: dto.category,
        amount: dto.amount,
        currency: 'BOB',
        occurredAt,
        description: dto.description?.trim() || null,
        user: { connect: { id: userId } },
      },
      select: {
        id: true,
        type: true,
        category: true,
        amount: true,
        currency: true,
        occurredAt: true,
        description: true,
        createdAt: true,
      },
    });

    return {
      ...tx,
      amount: tx.amount.toString(),
    };
  }

  async findMany(userId: string, q: QueryTxnsDto) {
    let from: Date | undefined;
    let to: Date | undefined;

    if (q.month) {
      const r = monthRange(q.month);
      from = r.from;
      to = r.to;
    } else {
      if (q.from) from = new Date(q.from);
      if (q.to) {
        // incluir el día completo: to + 1 día
        const d = new Date(q.to);
        to = new Date(d.getTime() + 24 * 60 * 60 * 1000);
      }
    }

    if (from && Number.isNaN(from.getTime()))
      throw new BadRequestException('from inválido');
    if (to && Number.isNaN(to.getTime()))
      throw new BadRequestException('to inválido');

    const txns = await this.prisma.transaction.findMany({
      where: {
        userId,
        ...(from || to
          ? {
              occurredAt: {
                ...(from ? { gte: from } : {}),
                ...(to ? { lt: to } : {}),
              },
            }
          : {}),
      },
      orderBy: { occurredAt: 'desc' },
      select: {
        id: true,
        type: true,
        category: true,
        amount: true,
        currency: true,
        occurredAt: true,
        description: true,
        createdAt: true,
      },
    });

    return txns.map((tx) => ({
      ...tx,
      amount: tx.amount.toString(),
    }));
  }

  async remove(userId: string, id: string) {
    const found = await this.prisma.transaction.findFirst({
      where: { id, userId },
      select: { id: true },
    });
    if (!found) throw new NotFoundException('Transacción no encontrada.');

    await this.prisma.transaction.delete({ where: { id } });
    return { ok: true };
  }
}
