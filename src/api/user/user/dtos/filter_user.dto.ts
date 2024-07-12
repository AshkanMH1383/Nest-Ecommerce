import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { EUserStatus } from '../enums/user_status.enum';

export default class FilterUserDto{
  @IsString()
  @IsOptional()
  firstname?: string;

  @IsString()
  @IsOptional()
  lastname?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsEmail()
  @IsOptional()
  mobile?: string;

  @IsEmail()
  @IsOptional()
  username?: string;

  @IsOptional()
  status?: EUserStatus;

  @Length(1, 3)
  page: number;

  @Length(1, 3)
  limit: number;
}
