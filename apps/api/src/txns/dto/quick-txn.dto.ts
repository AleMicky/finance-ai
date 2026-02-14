import { IsString, MaxLength } from 'class-validator';

export class QuickTxnDto {
  @IsString()
  @MaxLength(400)
  text!: string;
}
