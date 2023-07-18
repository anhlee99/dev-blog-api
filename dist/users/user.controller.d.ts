import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update.user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UsersService);
    getProfile(req: any): Promise<{}>;
    updateProfile(req: any, updateUserDto: UpdateUserDto): Promise<{}>;
}
