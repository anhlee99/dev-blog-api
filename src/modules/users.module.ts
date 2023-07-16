import { Module } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserEntity } from '../entitys/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from '../entitys/account.entity';
import { UserController } from '../controllers/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AccountEntity])],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
