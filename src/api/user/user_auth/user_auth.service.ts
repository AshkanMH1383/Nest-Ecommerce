import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserLogin } from './schemas/user_login.schema';
import LoginUserDto from './dtos/user_login.dto';

@Injectable()
export class UserAuthService {
  constructor(
    @InjectModel(UserLogin.name) private userModel: Model<UserLogin>
  ) {}

  // create
  async login(loginUserDto: LoginUserDto): Promise<UserLogin> {
   
  }
}
