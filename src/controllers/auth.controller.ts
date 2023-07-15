import { Body, Controller, Post } from "@nestjs/common";

@Controller('/')
export class AuthController {
  constructor() {
  }

  @Post()
  login(@Body('username') username: string, @Body('password') password: string): any {
    
  }
}