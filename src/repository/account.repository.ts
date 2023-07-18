import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AccountEntity } from '../entitys/account.entity';

@Injectable()
export class AccountRepository extends Repository<AccountEntity> {
  constructor(private dataSource: DataSource) {
    super(AccountEntity, dataSource.createEntityManager());
  }
}