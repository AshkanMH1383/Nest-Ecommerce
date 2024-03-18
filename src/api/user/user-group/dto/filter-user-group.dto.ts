import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/utils/pagination';

export class FilterUserGroupDto extends PaginationDto {
  @IsString()
  @IsOptional()
  name: string;
}
