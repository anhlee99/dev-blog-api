import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/guard/constants';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { UserRepository } from '../repository/user.repository';
import { AccountRepository } from '../repository/account.repository';
import { AuthController } from '../auth/auth.controller';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { LocalFileRepository } from '../repository/localfile.repository';
import { ConfigModule } from '@nestjs/config';
import { AppConfig } from '../config/app-config';

@Module({
  imports: [ConfigModule],
  providers: [
    CommonService,
    LocalFileRepository,
  ],
  controllers: [CommonController],
  exports: [CommonService],
})
export class CommonModule {}