import { DataSource, EntityManager, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entitys/user.entity';
import { AccountEntity } from '../entitys/account.entity';
import { InjectDataSource, InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    @InjectEntityManager() private userManager: EntityManager,
  ) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async queryTest(username: string) {
    return await this.dataSource.query(`SELECT * FROM t_accounts`);
  }
}
