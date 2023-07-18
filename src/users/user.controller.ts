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
import { AuthGuard } from '../auth/guard/auth.guard';
import { TransformWebInterceptor } from '../config/web/interceptor/transform.web.interceptor';
import { RegisterUserDto } from './dto/register.user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update.user.dto';
// import { Public } from "../base/auth/constants";

@Controller('user')
export class UserController {
  constructor(private userService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  @UseInterceptors(TransformWebInterceptor)
  getProfile(@Request() req) {
    return this.userService.getProfile(req.user.user_id);
  }

  @UseGuards(AuthGuard)
  @Post('update')
  @UseInterceptors(TransformWebInterceptor)
  updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateProfile(req.user.user_id, updateUserDto);
  }
}
