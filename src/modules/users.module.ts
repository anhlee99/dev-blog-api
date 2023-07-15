import { Module } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserEntity } from '../entitys/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
