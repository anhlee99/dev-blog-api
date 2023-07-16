import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { UpdateUserDto } from "../dto/update-user.dto";
export declare class UserController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UsersService);
    getProfile(req: any): Promise<{}>;
    updateProfile(req: any, updateUserDto: UpdateUserDto): Promise<{}>;
}
