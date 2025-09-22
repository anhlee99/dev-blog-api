import { DataSource, EntityManager, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entitys/user.entity';
import { InjectDataSource, InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    @InjectEntityManager() private userManager: EntityManager,
  ) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async queryTest(_username: string) {
    return await this.dataSource.query(`SELECT * FROM t_accounts`);
  }
}
