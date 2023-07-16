import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { UsersService } from '../services/users.service';
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UsersService);
    register(registerDto: RegisterDto): Promise<{}>;
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
