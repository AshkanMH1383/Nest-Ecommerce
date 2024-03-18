import { Controller, Post, Body } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { LoginUserAuthDto } from './dto/login-user-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('user-auth')
@ApiTags('user-auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('login')
  login(@Body() loginUserAuthDto: LoginUserAuthDto) {
    return this.userAuthService.login(loginUserAuthDto);
  }
}
