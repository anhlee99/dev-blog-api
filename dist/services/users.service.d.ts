import { UserEntity } from '../entitys/user.entity';
import { DataSource, Repository } from 'typeorm';
import { AccountEntity } from '../entitys/account.entity';
import { RegisterDto } from '../dto/register.dto';
import { UpdateUserDto } from "../dto/update-user.dto";
export declare class UsersService {
    private dataSource;
    private userRepository;
    private accountRepository;
    constructor(dataSource: DataSource, userRepository: Repository<UserEntity>, accountRepository: Repository<AccountEntity>);
    register(registerDto: RegisterDto): Promise<NonNullable<unknown>>;
    getProfile(userId: number): Promise<NonNullable<unknown>>;
    updateProfile(userId: number, updateUserDto: UpdateUserDto): Promise<NonNullable<unknown>>;
    add(user: UserEntity): Promise<void>;
    findAll(): Promise<UserEntity[]>;
    findOne(id: number): Promise<UserEntity>;
    modify(user: UserEntity): Promise<void>;
    remove(id: string): Promise<void>;
    findAccountByLoginName(username: string): Promise<AccountEntity>;
}
