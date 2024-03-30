import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCustomerGroupDto {
  @IsString()
  @ApiProperty()
  name: string;
}
