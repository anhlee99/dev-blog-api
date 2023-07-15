import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(username, pass) {
    const user = await this.usersService.findOneByUsername(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, username: user.username };
    return {
      username: username,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}