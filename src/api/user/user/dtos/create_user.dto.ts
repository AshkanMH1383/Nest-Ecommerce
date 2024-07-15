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
import MatchPassword from 'src/validations/match_password.validator';

export default class CreateUserDto {
  @IsString()
  username: string;

  @IsStrongPassword()
  @IsOptional()
  @MatchPassword('confirm', { message: 'Confirm password does not match the password.' })
  password: string;

  @IsStrongPassword()
  @IsOptional()
  @MatchPassword('password', { message: 'Confirm password does not match the password.' })
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
