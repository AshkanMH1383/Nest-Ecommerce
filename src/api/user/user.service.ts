import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { FilterUserDto } from './dto/filter-user.dto';
import { Pagination } from 'src/utils/pagination';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    let users = await this.findAll({
      username: createUserDto.username,
      page: 1,
      limit: 1,
    });
    if (users) {
      throw new HttpException(
        'This username has been registered by another person',
        400,
      );
    }

    users = await this.findAll({
      email: createUserDto.email,
      page: 1,
      limit: 1,
    });
    if (users) {
      throw new HttpException(
        'This email has been registered by another person',
        400,
      );
    }

    users = await this.findAll({
      mobile: createUserDto.mobile,
      page: 1,
      limit: 1,
    });
    if (users) {
      throw new HttpException(
        'This mobile has been registered by another person',
        400,
      );
    }

    if (!createUserDto.userGroupId) {
      createUserDto.userGroupId = 1;
    }

    const sendData = {
      ...createUserDto,
      userGroup: {
        id: createUserDto.userGroupId,
      },
    };

    const user = await this.userRepository.create(sendData);
    this.userRepository.save(user);
    return user;
  }

  async findAll(filter: FilterUserDto) {
    const query = this.userRepository.createQueryBuilder().select('*');

    if (filter.username) {
      query.where('username Like :username', {
        username: `%${filter.username}%`,
      });
    }

    if (filter.firstName) {
      query.where('firstName Like :firstName', {
        firstName: `%${filter.firstName}%`,
      });
    }

    if (filter.lastName) {
      query.where('lastName Like :lastName', {
        lastName: `%${filter.lastName}%`,
      });
    }

    if (filter.email) {
      query.where('email Like :email', { email: filter.email });
    }

    if (filter.mobile) {
      query.where('mobile Like :mobile', { mobile: filter.mobile });
    }

    if (filter.status) {
      query.where('status Like :status', { status: filter.status });
    }

    Pagination(query, { ...filter });

    const users = await query.execute();

    return users.length > 0 ? users : false;
  }

  async findOne(id: number) {
    const user_group = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user_group) {
      throw new HttpException('User not found', 404);
    }

    return user_group;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user_group = await this.userRepository.update(+id, updateUserDto);

    if (user_group.affected === 0) {
      throw new HttpException('User not found', 404);
    }

    return user_group;
  }

  async remove(id: number) {
    const user_group = await this.userRepository.delete(id);

    if (user_group.affected === 0) {
      throw new HttpException('User not found', 404);
    }

    return user_group;
  }
}
