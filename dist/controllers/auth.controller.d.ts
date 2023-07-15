import { AuthService } from '../services/auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: Record<string, any>): Promise<{
        username: any;
        access_token: string;
    }>;
    getProfile(req: any): any;
}
