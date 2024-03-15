import { Injectable, HttpException } from '@nestjs/common';
import { LoginUserAuthDto } from './dto/login-user-auth.dto';
import { UserService } from 'src/api/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserAuthDto: LoginUserAuthDto) {
    console.log(loginUserAuthDto);
    const user = await this.userService.findByUsername(
      loginUserAuthDto.username,
    );

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const isPasswordMath = await bcrypt.compare(
      loginUserAuthDto.password,
      user.password,
    );

    if (!isPasswordMath) {
      throw new HttpException('Wrong password', 400);
    }

    const accessToken = this.jwtService.sign({
      sub: user.id,
      username: user.username,
    });
    return {
      accessToken,
    };
  }
}
