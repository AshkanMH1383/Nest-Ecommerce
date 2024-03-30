import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/utils/pagination';

export class FilterCustomerGroupDto extends PaginationDto {
  @IsString()
  @IsOptional()
  name: string;
}
