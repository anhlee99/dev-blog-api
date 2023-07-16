import {
  Body,
  Controller,
  Post,
  HttpCode,
  UseGuards,
  Get,
  HttpStatus,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../base/auth/auth.guard';
import { TransformInterceptor } from '../base/config/transform.interceptor';
import { RegisterDto } from '../dto/register.dto';
import { UsersService } from '../services/users.service';
import { UpdateUserDto } from "../dto/update-user.dto";
// import { Public } from "../base/auth/constants";

@Controller('user')
export class UserController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  @UseInterceptors(TransformInterceptor)
  getProfile(@Request() req) {
    return this.userService.getProfile(req.user.user_id);
  }

  @UseGuards(AuthGuard)
  @Post('update')
  @UseInterceptors(TransformInterceptor)
  updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateProfile(req.user.user_id, updateUserDto);
  }
}
