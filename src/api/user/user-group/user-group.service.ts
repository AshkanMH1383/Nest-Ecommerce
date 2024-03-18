import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserGroupDto } from './dto/create-user-group.dto';
import { UpdateUserGroupDto } from './dto/update-user-group.dto';
import { Repository } from 'typeorm';
import { UserGroup } from 'src/database/entities/user-group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterUserGroupDto } from './dto/filter-user-group.dto';
import { Pagination } from 'src/utils/pagination';

@Injectable()
export class UserGroupService {
  constructor(
    @InjectRepository(UserGroup)
    private userGroupRepository: Repository<UserGroup>,
  ) {}

  async create(createUserGroupDto: CreateUserGroupDto) {
    createUserGroupDto.permission = JSON.stringify(
      createUserGroupDto.permission,
    );
    const new_user_group =
      await this.userGroupRepository.save(createUserGroupDto);
    return new_user_group;
  }

  async findAll(filter: FilterUserGroupDto) {
    const query = this.userGroupRepository.createQueryBuilder().select('*');

    if (filter.name) {
      query.where('name= :name', { name: filter.name });
    }

    Pagination(query, { ...filter });

    return await query.execute();
  }

  async findOne(id: number) {
    const user_group = await this.userGroupRepository.findOne({
      where: {
        id,
      },
    });

    if (!user_group) {
      throw new HttpException('User Group not found', 404);
    }

    return user_group;
  }

  async update(id: number, updateUserGroupDto: UpdateUserGroupDto) {
    updateUserGroupDto.permission = JSON.stringify(
      updateUserGroupDto.permission,
    );
    const user_group = await this.userGroupRepository.update(
      +id,
      updateUserGroupDto,
    );

    if (user_group.affected === 0) {
      throw new HttpException('User Group not found', 404);
    }

    return user_group;
  }

  async remove(id: number) {
    const user_group = await this.userGroupRepository.delete(id);

    if (user_group.affected === 0) {
      throw new HttpException('User Group not found', 404);
    }

    return user_group;
  }
}
