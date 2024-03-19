import { IsEmail, IsMobilePhone, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/utils/pagination';

export class FilterUserDto extends PaginationDto {
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsMobilePhone()
  @IsOptional()
  mobile?: string;

  @IsOptional()
  status?: 0 | 1;
}
