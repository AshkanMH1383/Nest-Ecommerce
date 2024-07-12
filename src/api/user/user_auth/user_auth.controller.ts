import { Controller, Get, Post, Body, Param, Put, Delete, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDto from './dtos/create_user.dto';
import { PasswordService } from 'src/hash/password.service';

@Controller('user')
export class UserController {
  constructor(
    private passwordService: PasswordService,
    private userService: UserService
  ) {}

  @Post()
  async login(@Body() createUserDto: CreateUserDto) {
    let user: any = [];
    
    if(createUserDto.email) {
      user = await this.userService.findOneByEmail(createUserDto.email);
      if(user)
        throw new HttpException('this email registred by another user' , 400)
    }

    if(createUserDto.mobile) {
      user = await this.userService.findOneByMobile(createUserDto.mobile);
      if(user)
        throw new HttpException('this mobile registred by another user' , 400)
    }

    if(createUserDto.username) {
      user = await this.userService.findOneByUsername(createUserDto.username);
      if(user)
        throw new HttpException('this username registred by another user' , 400)
    }

    if(createUserDto.password) {
      createUserDto.password = await this.passwordService.hashPassword(createUserDto.password);
    }

    return this.userService.create(createUserDto);
  }


}

