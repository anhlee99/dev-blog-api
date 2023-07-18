import { IsEmail, IsNotEmpty, Min, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  login_name: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
