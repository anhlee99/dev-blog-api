import { HttpCode, HttpStatus, Injectable, LoggerService } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entitys/user.entity';
// This should be a real class/interface representing a user entity
import { DataSource, Repository } from 'typeorm';
import { AccountEntity } from '../entitys/account.entity';
import { RegisterUserDto } from './dto/register.user.dto';
import { FAILURE, LOGIN_NAME_EXIST, SUCCESSFUL } from '../utils/message.util';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserRepository } from '../repository/user.repository';
import { AccountRepository } from '../repository/account.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,

    private userRepository: UserRepository,

    private accountRepository: AccountRepository,
  ) {}

  // user //

  async register(registerDto: RegisterUserDto): Promise<NonNullable<unknown>> {
    let accountEntity = await this.accountRepository.findOne({
      where: { login_name: registerDto.login_name },
    });
    if (accountEntity != null) {
      return {
        code: HttpStatus.BAD_REQUEST,
        message: LOGIN_NAME_EXIST,
      };
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // create account //
      accountEntity = new AccountEntity();
      accountEntity.account_type = 0;
      accountEntity.login_name = registerDto.login_name;
      accountEntity.password = registerDto.password;
      await queryRunner.manager.save(accountEntity);

      // create user //
      const userEntity = new UserEntity();
      userEntity.account_id = accountEntity.id;
      userEntity.email = registerDto.login_name;
      await queryRunner.manager.save(userEntity);

      // update account //
      accountEntity.user_id = userEntity.id;
      await queryRunner.manager.save(accountEntity);

      await queryRunner.commitTransaction();
      return {
        code: HttpStatus.CREATED,
        message: SUCCESSFUL,
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return {
        code: HttpStatus.BAD_REQUEST,
        message: FAILURE,
      };
    } finally {
      await queryRunner.release();
    }
  }

  async getProfile(userId: number): Promise<NonNullable<unknown>> {
    // const userEntity = await this.userRepository.findOne({
    //   where: { id: userId },
    // });

    const a = await this.userRepository.queryTest('a');
    return {
      result: a,
    };
  }

  async updateProfile(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<NonNullable<unknown>> {
    const userEntity = await this.userRepository.findOne({
      where: { id: userId },
    });
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      userEntity.fullname = updateUserDto.fullname || userEntity.fullname;
      userEntity.address = updateUserDto.address || userEntity.address;
      userEntity.bio = updateUserDto.bio || userEntity.bio;
      userEntity.email = updateUserDto.email || userEntity.email;
      userEntity.facebook = updateUserDto.facebook || userEntity.facebook;
      userEntity.user_setting_data = updateUserDto.user_setting_data || userEntity.user_setting_data;
      await queryRunner.manager.save(userEntity);
      await queryRunner.commitTransaction();
      return {
        code: HttpStatus.OK,
        message: SUCCESSFUL,
        result: userEntity,
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return {
        code: HttpStatus.BAD_REQUEST,
        message: FAILURE,
      };
    } finally {
      await queryRunner.release();
    }
  }

  // account //
  async findAccountByLoginName(username: string): Promise<AccountEntity> {
    return this.accountRepository.findOne({
      where: { login_name: username },
    });
  }
}
