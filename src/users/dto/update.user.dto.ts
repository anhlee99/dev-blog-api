import { IsEmail, IsNotEmpty, IsUrl } from "class-validator";

export class UpdateUserDto {

  @IsEmail()
  email: string;

  picture: string;

  fullname: string;

  address: string;

  bio: string;

  @IsUrl()
  facebook: string;

  user_setting_data: JSON;
}
