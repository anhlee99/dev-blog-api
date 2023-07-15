import { UserEntity } from '../entitys/user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    add(user: UserEntity): Promise<void>;
    findAll(): Promise<UserEntity[]>;
    findOne(id: number): Promise<UserEntity>;
    findOneByUsername(username: string): Promise<UserEntity>;
    modify(user: UserEntity): Promise<void>;
    remove(id: string): Promise<void>;
}
