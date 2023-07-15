import {
  Body,
  Controller,
  Post,
  HttpCode,
  UseGuards,
  Get,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../base/auth/auth.guard';
import { Public } from "../base/auth/constants";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}