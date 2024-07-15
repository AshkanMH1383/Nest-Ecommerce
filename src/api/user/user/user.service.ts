import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import CreateUserDto from './dtos/create_user.dto';
import UpdateUserDto from './dtos/update_user.dto';
import { PasswordService } from 'src/hash/password.service';

@Injectable()
export class UserService {
  constructor(
    private readonly passwordService: PasswordService,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  // create
  async create(createUserDto: CreateUserDto): Promise<User> {
    if(createUserDto.password && createUserDto.confirm) {
        createUserDto.password = await this.passwordService.hashPassword(createUserDto.password)
        delete createUserDto.confirm;
    }
    
    return await this.userModel.create({
      ...createUserDto,
      date_added: Date.now().toString()
    })
  }

  // update
  async updateOne(user_id:string, updateUserDto: UpdateUserDto): Promise<any> {
    let user = await this.findOneById(user_id);

    if(updateUserDto.password && updateUserDto.confirm) {
        updateUserDto.password = await this.passwordService.hashPassword(updateUserDto.password)
        delete updateUserDto.confirm;
    }

    return await this.userModel.updateOne({_id: user._id},{
      ...updateUserDto,
      date_modified: Date.now().toString()
    })

  }

  // find
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(key:string, value:string) {
    let data: any = [];
    switch (key) {
      case 'id':
        data = await this.findOneById(value);
        break;

      case 'email':
        data = await this.findOneByEmail(value);
        break;

      case 'mobile':
        data = await this.findOneByMobile(value);
        break;

      case 'username':
        data = await this.findOneByUsername(value);
        break;
    }
    
    if(!data)
      throw new HttpException('user not found' , 404)

    return data;
  }
  
  async findOneById(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async findOneByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async findOneByMobile(mobile: string): Promise<User> {
    return this.userModel.findOne({ mobile }).exec();
  }

  // delete
  async deleteOneById(id: string) {
    return this.userModel.deleteOne({ _id: id }).exec();
  }

  async deleteOneByUsername(username: string) {
    return this.userModel.deleteOne({ username }).exec();
  }

  async deleteOneByEmail(email: string) {
    return this.userModel.deleteOne({ email }).exec();
  }

  async deleteOneByMobile(mobile: string) {
    return this.userModel.deleteOne({ mobile }).exec();
  }

}
