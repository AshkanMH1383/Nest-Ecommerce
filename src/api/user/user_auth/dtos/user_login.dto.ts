import {
    IsOptional,
    IsString,
    IsStrongPassword,
} from 'class-validator';

export default class LoginUserDto {
    @IsString()
    username: string;

    @IsStrongPassword()
    password: string;

    @IsOptional()
    ip: string;

    @IsOptional()
    userAgent: string;
}
  