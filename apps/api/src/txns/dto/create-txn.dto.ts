import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export enum TxnType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export enum Category {
  FOOD = 'FOOD',
  TRANSPORT = 'TRANSPORT',
  HEALTH = 'HEALTH',
  EDUCATION = 'EDUCATION',
  HOUSING = 'HOUSING',
  UTILITIES = 'UTILITIES',
  ENTERTAINMENT = 'ENTERTAINMENT',
  SHOPPING = 'SHOPPING',
  TRANSFER = 'TRANSFER',
  OTHER = 'OTHER',
}

export class CreateTxnDto {
  @IsEnum(TxnType)
  type!: TxnType;

  @IsEnum(Category)
  category!: Category;

  @IsNumber()
  amount!: number;

  @IsOptional()
  @IsString()
  @MaxLength(240)
  description?: string;

  // ISO string: "2026-02-12T00:00:00.000Z"
  @IsDateString()
  occurredAt!: string;
}
