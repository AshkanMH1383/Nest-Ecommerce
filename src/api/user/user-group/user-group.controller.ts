import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserGroupService } from './user-group.service';
import { CreateUserGroupDto } from './dto/create-user-group.dto';
import { UpdateUserGroupDto } from './dto/update-user-group.dto';
import { ApiTags } from '@nestjs/swagger';
import { FilterUserGroupDto } from './dto/filter-user-group.dto';
import { UserAuthGuard } from 'src/api/auth/user-auth/user-auth.guard';

@Controller('user-group')
@ApiTags('user-group')
export class UserGroupController {
  constructor(private readonly userGroupService: UserGroupService) {}

  @UseGuards(UserAuthGuard)
  @Post()
  create(@Body() createUserGroupDto: CreateUserGroupDto) {
    return this.userGroupService.create(createUserGroupDto);
  }

  @UseGuards(UserAuthGuard)
  @Get()
  findAll(@Query() filter: FilterUserGroupDto) {
    return this.userGroupService.findAll(filter);
  }

  @UseGuards(UserAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userGroupService.findOne(+id);
  }

  @UseGuards(UserAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserGroupDto: UpdateUserGroupDto,
  ) {
    return this.userGroupService.update(+id, updateUserGroupDto);
  }

  @UseGuards(UserAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userGroupService.remove(+id);
  }
}
