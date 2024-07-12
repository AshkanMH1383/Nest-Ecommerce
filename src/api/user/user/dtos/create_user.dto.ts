import {
  IsArray,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { EUserStatus } from '../enums/user_status.enum';

export default class CreateUserDto {
  @IsString()
  username: string;

  @IsStrongPassword()
  @IsOptional()
  password: string;

  @IsStrongPassword()
  @IsOptional()
  confirm: string;

  @IsOptional()
  @IsString()
  firstname?: string;

  @IsOptional()
  @IsString()
  lastname?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsMobilePhone()
  mobile?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsNumber()
  @IsEnum(EUserStatus)
  status: EUserStatus;

  @IsOptional()
  date_added: string = Date.now().toString()

  @IsArray()
  groups: [];

  @IsArray()
  role: [];
}
