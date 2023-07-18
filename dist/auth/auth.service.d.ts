import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../repository/user.repository';
import { AccountRepository } from '../repository/account.repository';
export declare class AuthService {
    private accountRepository;
    private userRepository;
    private jwtService;
    constructor(accountRepository: AccountRepository, userRepository: UserRepository, jwtService: JwtService);
    signIn(login_name: any, pass: any): Promise<{
        result: {
            username: any;
            access_token: string;
        };
    }>;
}
