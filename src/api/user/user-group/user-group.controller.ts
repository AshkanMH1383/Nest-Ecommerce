import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { UserGroupService } from './user-group.service';
import { CreateUserGroupDto } from './dto/create-user-group.dto';
import { UpdateUserGroupDto } from './dto/update-user-group.dto';
import { ApiTags } from '@nestjs/swagger';
import { FilterUserGroupDto } from './dto/filter-user-group.dto';

@Controller('user-group')
@ApiTags('user-group')
export class UserGroupController {
  constructor(private readonly userGroupService: UserGroupService) {}

  @Post()
  create(@Body() createUserGroupDto: CreateUserGroupDto) {
    return this.userGroupService.create(createUserGroupDto);
  }

  @Get()
  findAll(@Query() filter: FilterUserGroupDto) {
    return this.userGroupService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userGroupService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserGroupDto: UpdateUserGroupDto,
  ) {
    return this.userGroupService.update(+id, updateUserGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userGroupService.remove(+id);
  }
}
