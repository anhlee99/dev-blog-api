import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {

  @IsEmail()
  login_name: string;

  @IsNotEmpty()
  password: string;
}
