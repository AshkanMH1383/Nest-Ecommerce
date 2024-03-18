import {
  IsBoolean,
  IsEmail,
  IsMobilePhone,
  IsNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  userGroupId: number;

  @IsString()
  username: string;

  @IsStrongPassword()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsMobilePhone()
  mobile: string;

  @IsString()
  image: string;

  @IsBoolean()
  status: boolean;
}
