import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserLogin } from './schemas/user_login.schema';
import LoginUserDto from './dtos/user_login.dto';
import { UserService } from '../user/user.service';
import { PasswordService } from 'src/hash/password.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserLogin.name) private userLoginModel: Model<UserLogin>
  ) {}  

  // create
  async login(loginUserDto: LoginUserDto, user:User): Promise<any> {

    const access_token = await this.jwtService.sign({ 
      username: user.username, sub: user._id 
    });

    await this.userLoginModel.create({
      user_id: user._id,
      token: access_token,
      ip: loginUserDto.ip,
      user_agent: loginUserDto.userAgent,
      date_added: Date.now().toString()
    })
    
    await this.userModel.updateOne({_id: user._id}, {
      token: access_token,
      failed_login_attemps: 0
    })

    return {
      access_token
    };
  }

  async addFailedLoginAttemps(user:User) {
    await this.userModel.updateOne({_id: user._id}, {
      failed_login_attemps: user.failed_login_attemps + 1
    })
  }
  
  async logout(user: User) {
    await this.userModel.updateOne({_id: user._id}, {
      token: '',
      failed_login_attemps: 0
    })
  }

  async checkFailedLoginAttemps(user: User): Promise<boolean> {
    const user_login = await this.userLoginModel.findOne({user_id: user._id}).sort({date_added: -1})

    let date_now: any = new Date();
    date_now.setHours(date_now.getHours() + 1);
    date_now = Number(date_now.getTime());
    
    if(user.failed_login_attemps > 4)
      if(date_now > Number(Date.now.toString))
        return true;

    return false;
  }
}


