import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signIn(login_name: any, pass: any): Promise<{
        result: {
            username: any;
            access_token: string;
        };
    }>;
}
