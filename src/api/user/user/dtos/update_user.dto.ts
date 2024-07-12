import { PartialType } from '@nestjs/mapped-types';
import CreateUserDto from './create_user.dto';

export default class UpdateUserDto extends PartialType(CreateUserDto) {}
