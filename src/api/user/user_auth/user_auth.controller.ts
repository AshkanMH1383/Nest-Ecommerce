import { Controller, Get, Post, Body, Param, Put, Delete, HttpException, Req, UnauthorizedException } from '@nestjs/common';
import { PasswordService } from 'src/hash/password.service';
import LoginUserDto from './dtos/user_login.dto';
import { UserService } from '../user/user.service';
import { Request } from 'express';
import { UserAuthService } from './user_auth.service';

@Controller('user_auth')
export class UserAuthController {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private userAuthService: UserAuthService
  ) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto , @Req() req: Request) {
    const user = await this.userService.findOneByUsername(loginUserDto.username);
    if(!user) 
      throw new HttpException('user not found' , 404)

    if(this.userAuthService.checkFailedLoginAttemps(user)) {
      throw new UnauthorizedException('Failed Loggin Attemps');
    }
    

    const isMatch = await this.passwordService.comparePassword(loginUserDto.password , user.password);
    console.log(isMatch)
    if(!isMatch) {
      await this.userAuthService.addFailedLoginAttemps(user);
      throw new UnauthorizedException('Invalid username or password');
    }

    const access_token = await this.userAuthService.login({
      ...loginUserDto,
      ip: req.ip,
      userAgent: req.headers['user-agent'],
    } , user)

    return access_token;

  }


}

