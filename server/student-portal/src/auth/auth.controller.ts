import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';

@Controller({path:'auth', version: '1'})
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto:SignInDto) {
    return this.authService.signIn(signInDto);
  }
}