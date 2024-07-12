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

export default class LoginUserDto {
    @IsString()
    username: string;

    @IsStrongPassword()
    password: string;
}
  