import { IsString, Matches } from 'class-validator';

export class DashboardQueryDto {
  @IsString()
  @Matches(/^\d{4}-\d{2}$/, { message: 'month debe ser YYYY-MM' })
  month!: string;
}
