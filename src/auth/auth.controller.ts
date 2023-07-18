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
import { AuthService } from './auth.service';
import { AuthGuard } from './guard/auth.guard';
import { TransformWebInterceptor } from '../config/web/interceptor/transform.web.interceptor';
import { RegisterUserDto } from '../users/dto/register.user.dto';
import { UsersService } from '../users/users.service';
// import { Public } from "../base/auth/constants";

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('register')
  @UseInterceptors(TransformWebInterceptor)
  register(@Body() registerDto: RegisterUserDto) {
    return this.userService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TransformWebInterceptor)
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.login_name, signInDto.password);
  }

  @Get('test')
  @UseInterceptors(TransformWebInterceptor)
  test(@Request() req) {
    return { message: 'abc' };
  }
}
