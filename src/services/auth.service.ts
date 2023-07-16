import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(login_name, pass) {
    const accountEntity = await this.usersService.findAccountByLoginName(
      login_name,
    );
    if (accountEntity?.password !== pass) {
      throw new UnauthorizedException();
    }
    const userEntity = await this.usersService.findOne(accountEntity.user_id);
    const payload = {
      account_id: accountEntity.id,
      login_name: accountEntity.login_name,
      user_id: userEntity.id,
      email: userEntity.email,
      fullname: userEntity.fullname,
      shortname: userEntity.shortname,
    };
    return {
      result: {
        username: login_name,
        access_token: await this.jwtService.signAsync(payload),
      },
    };
  }
}
