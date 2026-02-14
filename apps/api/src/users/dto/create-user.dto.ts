import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @MaxLength(255)
  email!: string;

  @IsString()
  @MaxLength(120)
  name!: string;

  @IsString()
  @MinLength(6)
  @MaxLength(72)
  password!: string;
}
