export type TxnType = 'INCOME' | 'EXPENSE';

export type Category =
  | 'FOOD'
  | 'TRANSPORT'
  | 'HEALTH'
  | 'EDUCATION'
  | 'HOUSING'
  | 'UTILITIES'
  | 'ENTERTAINMENT'
  | 'SHOPPING'
  | 'TRANSFER'
  | 'OTHER';

export type TxnClassification = {
  type: TxnType;
  category: Category;
  amount: number | null;
  currency: 'BOB';
  note: string;
};

export type MonthInsights = {
  forecast: number; // gasto estimado a fin de mes
  risk: 'BAJO' | 'MEDIO' | 'ALTO';
  tips: [string, string, string];
  warning: string;
};

export function isTxnClassification(x: unknown): x is TxnClassification {
  if (!x || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;

  const okType = o.type === 'INCOME' || o.type === 'EXPENSE';
  const okCurrency = o.currency === 'BOB';
  const okAmount = typeof o.amount === 'number' || o.amount === null;
  const okNote = typeof o.note === 'string';

  const allowedCategories = new Set([
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
  ]);
  const okCategory =
    typeof o.category === 'string' && allowedCategories.has(o.category);

  return okType && okCategory && okAmount && okCurrency && okNote;
}

export function isMonthInsights(x: unknown): x is MonthInsights {
  if (!x || typeof x !== 'object') return false;
  const o = x as Record<string, unknown>;

  const okForecast = typeof o.forecast === 'number';
  const okRisk = o.risk === 'BAJO' || o.risk === 'MEDIO' || o.risk === 'ALTO';
  const okWarning = typeof o.warning === 'string';

  const tips = o.tips;
  const okTips =
    Array.isArray(tips) &&
    tips.length === 3 &&
    tips.every((t) => typeof t === 'string');

  return okForecast && okRisk && okTips && okWarning;
}
