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
// import { Public } from "../base/auth/constants";

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Post('register')
  @UseInterceptors(TransformInterceptor)
  register(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(TransformInterceptor)
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.login_name, signInDto.password);
  }

  @Get('test')
  @UseInterceptors(TransformInterceptor)
  test(@Request() req) {
    return { message: 'abc' };
  }
}
