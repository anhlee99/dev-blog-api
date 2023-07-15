import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signIn(username: any, pass: any): Promise<{
        username: any;
        access_token: string;
    }>;
}
