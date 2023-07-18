import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from '../entitys/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from '../entitys/account.entity';
import { UserController } from './user.controller';
import { UserRepository } from '../repository/user.repository';
import { AccountRepository } from '../repository/account.repository';
import { LocalFileEntity } from '../entitys/localfile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, AccountEntity, LocalFileEntity]),
  ],
  providers: [UsersService, UserRepository, AccountRepository],
  controllers: [UserController],
  exports: [UsersService],
})
export class UsersModule {}
