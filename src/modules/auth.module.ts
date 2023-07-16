import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { UsersModule } from './users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../base/auth/constants';
import { AuthGuard } from '../base/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { UserController } from "../controllers/user.controller";

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthService,
    // apply check auth all api
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // }
  ],
  controllers: [AuthController, UserController],
  exports: [AuthService],
})
export class AuthModule {}