import { Injectable, HttpException } from '@nestjs/common';
import { LoginUserAuthDto } from './dto/login-user-auth.dto';
import { UserService } from 'src/api/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserLogin } from 'src/database/entities/user-login.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(UserLogin)
    private readonly userLoginRepository: Repository<UserLogin>,
  ) {}

  async login(
    loginUserAuthDto: LoginUserAuthDto,
    user_agent: string,
    ip: string,
  ) {
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

    await this.userLoginRepository.save({
      ip,
      user_agent,
      user: { id: user.id },
      token: accessToken,
    });

    return {
      accessToken,
    };
  }
}
