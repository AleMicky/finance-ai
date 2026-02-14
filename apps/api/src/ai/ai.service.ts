import OpenAI from 'openai';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CLASSIFY_SYSTEM, INSIGHTS_SYSTEM } from './prompts';
import {
  TxnClassification,
  MonthInsights,
  isTxnClassification,
  isMonthInsights,
} from './types';

@Injectable()
export class AiService {
  private client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  async classify(text: string): Promise<TxnClassification> {
    if (!text?.trim()) throw new BadRequestException('text vacío');

    const response = await this.client.responses.create({
      model: 'gpt-4o-mini',
      input: [
        { role: 'system', content: CLASSIFY_SYSTEM },
        { role: 'user', content: text },
      ],
      text: {
        format: {
          type: 'json_schema',
          name: 'txn_classification',
          strict: true,
          schema: {
            type: 'object',
            additionalProperties: false,
            properties: {
              type: { type: 'string', enum: ['INCOME', 'EXPENSE'] },
              category: {
                type: 'string',
                enum: [
                  'FOOD',
                  'TRANSPORT',
                  'HEALTH',
                  'EDUCATION',
                  'HOUSING',
                  'UTILITIES',
                  'ENTERTAINMENT',
                  'SHOPPING',
                  'TRANSFER',
                  'OTHER',
                ],
              },
              amount: { type: ['number', 'null'] },
              currency: { type: 'string', enum: ['BOB'] },
              note: { type: 'string' },
            },
            required: ['type', 'category', 'amount', 'currency', 'note'],
          },
        },
      },
    });

    const raw = response.output_text;
    if (!raw) throw new BadRequestException('La IA no devolvió contenido.');

    const parsed: unknown = JSON.parse(raw);
    if (!isTxnClassification(parsed)) {
      throw new BadRequestException('JSON inválido devuelto por IA.');
    }
    return parsed;
  }

  async insights(input: {
    month: string;
    incomeTotal: number;
    expenseTotal: number;
    avgDailyExpense: number;
    daysRemaining: number;
    topCategories: string;
  }): Promise<MonthInsights> {
    const userText = `
Mes: ${input.month}
Ingresos: ${input.incomeTotal}
Gastos: ${input.expenseTotal}
Promedio diario gasto: ${input.avgDailyExpense}
Días restantes: ${input.daysRemaining}
Top categorías: ${input.topCategories}
`.trim();

    const response = await this.client.responses.create({
      model: 'gpt-4o-mini',
      input: [
        { role: 'system', content: INSIGHTS_SYSTEM },
        { role: 'user', content: userText },
      ],
      text: {
        format: {
          type: 'json_schema',
          name: 'month_insights',
          strict: true,
          schema: {
            type: 'object',
            additionalProperties: false,
            properties: {
              forecast: { type: 'number' },
              risk: { type: 'string', enum: ['BAJO', 'MEDIO', 'ALTO'] },
              tips: {
                type: 'array',
                items: { type: 'string' },
                minItems: 3,
                maxItems: 3,
              },
              warning: { type: 'string' },
            },
            required: ['forecast', 'risk', 'tips', 'warning'],
          },
        },
      },
    });

    const raw = response.output_text;
    if (!raw) throw new BadRequestException('La IA no devolvió contenido.');

    const parsed: unknown = JSON.parse(raw);
    if (!isMonthInsights(parsed)) {
      throw new BadRequestException('JSON inválido devuelto por IA.');
    }

    // convertir tips a tupla exacta de 3
    const tips = parsed.tips;
    return { ...parsed, tips };
  }
}
