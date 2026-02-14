import { IsString, MaxLength } from 'class-validator';

export class ClassifyDto {
  @IsString()
  @MaxLength(400)
  text!: string;
}
