import { DataSource } from 'typeorm';
import { AccountEntity } from '../entitys/account.entity';
import { RegisterUserDto } from './dto/register.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserRepository } from '../repository/user.repository';
import { AccountRepository } from '../repository/account.repository';
export declare class UsersService {
    private dataSource;
    private userRepository;
    private accountRepository;
    constructor(dataSource: DataSource, userRepository: UserRepository, accountRepository: AccountRepository);
    register(registerDto: RegisterUserDto): Promise<NonNullable<unknown>>;
    getProfile(userId: number): Promise<NonNullable<unknown>>;
    updateProfile(userId: number, updateUserDto: UpdateUserDto): Promise<NonNullable<unknown>>;
    findAccountByLoginName(username: string): Promise<AccountEntity>;
}
