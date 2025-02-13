import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AdminSignInDto } from './dto/adminSignIn.dto';
import { Public } from 'src/decorators/auth.decorator';
import { UtilsService } from 'src/utils/utils.service';
import { UserSigninDto } from './dto/userSignIn.dto';

@Controller({path:'auth', version: '1'})
export class AuthController {
  constructor(private authService: AuthService, private utilsService: UtilsService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('admin/login')
  adminSignIn(@Body() signInDto: AdminSignInDto ) {
    return this.authService.adminSignIn(signInDto)
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('user/login')
  userSignIn(@Body() signInDto: UserSigninDto) {
    return this.authService.studentSignIn(signInDto)
  }

}