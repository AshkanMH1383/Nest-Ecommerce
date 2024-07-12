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
  async create(@Body() createUserDto: CreateUserDto) {
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

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':key/:value')
  async findOne(
    @Param('key') key: string,
    @Param('value') value: string
  ) {

    let data: any = [];
    switch (key) {
      case 'id':
        data = await this.userService.findOneById(value);
        break;

      case 'email':
        data = await this.userService.findOneByEmail(value);
        break;

      case 'mobile':
        data = await this.userService.findOneByMobile(value);
        break;

      case 'username':
        data = await this.userService.findOneByUsername(value);
        break;
    }
    
    if(!data)
      throw new HttpException('user not found' , 404)

    return data;
  }

  @Delete(':key/:value')
  async deleteOne(
    @Param('key') key: string,
    @Param('value') value: string
  ) {

    let data: any = [];
    switch (key) {
      case 'id':
        data = await this.userService.deleteOneById(value);

      case 'email':
        data = await this.userService.deleteOneByEmail(value);

      case 'mobile':
        data = await this.userService.deleteOneByMobile(value);

      case 'username':
        data = await this.userService.deleteOneByUsername(value);
    }
    

    if(!data)
      throw new HttpException('user not found' , 404)

  }

}

