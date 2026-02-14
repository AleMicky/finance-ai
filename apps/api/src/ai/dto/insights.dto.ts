import { IsInt, IsNumber, IsString, MaxLength, Min } from 'class-validator';

export class InsightsDto {
  @IsString()
  @MaxLength(7)
  month!: string; // "YYYY-MM"

  @IsNumber()
  incomeTotal!: number;

  @IsNumber()
  expenseTotal!: number;

  @IsInt()
  @Min(0)
  daysRemaining!: number;

  @IsNumber()
  avgDailyExpense!: number;

  // puedes pasar un resumen por categoría (string JSON) o array luego
  @IsString()
  @MaxLength(2000)
  topCategories!: string; // ej: "FOOD=520, TRANSPORT=120, ..."
}
