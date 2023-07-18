import { AuthService } from './auth.service';
import { RegisterUserDto } from '../users/dto/register.user.dto';
import { UsersService } from '../users/users.service';
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UsersService);
    register(registerDto: RegisterUserDto): Promise<{}>;
    signIn(signInDto: Record<string, any>): Promise<{
        result: {
            username: any;
            access_token: string;
        };
    }>;
    test(req: any): {
        message: string;
    };
}
