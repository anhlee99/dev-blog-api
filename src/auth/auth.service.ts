import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from '../users/dto/register.user.dto';
import { UserRepository } from '../repository/user.repository';
import { AccountRepository } from '../repository/account.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from '../entitys/account.entity';
import { UserEntity } from '../entitys/user.entity';

@Injectable()
export class AuthService {
  constructor(

    private accountRepository: AccountRepository,

    private userRepository: UserRepository,

    private jwtService: JwtService,
  ) {}

  async signIn(login_name, pass) {
    const accountEntity = await this.accountRepository.findOne({
      where: { login_name: login_name },
    });
    if (accountEntity?.password !== pass) {
      throw new UnauthorizedException();
    }
    const userEntity = await this.userRepository.findOne({
      where: { id: accountEntity.user_id },
    });
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
