import { DataSource, EntityManager, Repository } from 'typeorm';
import { UserEntity } from '../entitys/user.entity';
export declare class UserRepository extends Repository<UserEntity> {
    private dataSource;
    private userManager;
    constructor(dataSource: DataSource, userManager: EntityManager);
    queryTest(username: string): Promise<any>;
}
