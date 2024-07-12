import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import CreateUserDto from './dtos/create_user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  // create
  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel({
      ...createUserDto,
      date_added: Date.now().toString()
    });

    return createdUser.save();
  }

  // find
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
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
