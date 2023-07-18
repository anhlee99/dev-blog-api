import { DataSource, Repository } from 'typeorm';
import { AccountEntity } from '../entitys/account.entity';
export declare class AccountRepository extends Repository<AccountEntity> {
    private dataSource;
    constructor(dataSource: DataSource);
}
