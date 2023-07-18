import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './guard/constants';
import { AuthGuard } from './guard/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { UserController } from '../users/user.controller';
import { UserRepository } from '../repository/user.repository';
import { AccountRepository } from '../repository/account.repository';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthService,
    UsersService,
    UserRepository,
    AccountRepository
    // apply check auth all api
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // }
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}