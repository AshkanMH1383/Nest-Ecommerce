import { Controller, Post, Body } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { LoginUserAuthDto } from './dto/login-user-auth.dto';

@Controller('user-auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('login')
  login(@Body() loginUserAuthDto: LoginUserAuthDto) {
    return this.userAuthService.login(loginUserAuthDto);
  }
}
