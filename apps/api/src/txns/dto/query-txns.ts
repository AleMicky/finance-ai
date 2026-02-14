import { IsISO8601, IsOptional, IsString } from 'class-validator';

export class QueryTxnsDto {
  // "2026-02-01"
  @IsOptional()
  @IsISO8601()
  from?: string;

  // "2026-02-29"
  @IsOptional()
  @IsISO8601()
  to?: string;

  // "2026-02" (más cómodo para dashboard mensual)
  @IsOptional()
  @IsString()
  month?: string;
}
