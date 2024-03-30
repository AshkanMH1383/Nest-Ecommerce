import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CustomerGroupService } from './customer-group.service';
import { CreateCustomerGroupDto } from './dto/create-customer-group.dto';
import { UpdateCustomerGroupDto } from './dto/update-customer-group.dto';
import { ApiTags } from '@nestjs/swagger';
import { FilterCustomerGroupDto } from './dto/filter-customer-group.dto';

@Controller('customer-group')
@ApiTags('customer-group')
export class CustomerGroupController {
  constructor(private readonly customerGroupService: CustomerGroupService) {}

  @Post()
  create(@Body() createCustomerGroupDto: CreateCustomerGroupDto) {
    return this.customerGroupService.create(createCustomerGroupDto);
  }

  @Get()
  findAll(@Query() filter: FilterCustomerGroupDto) {
    return this.customerGroupService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.customerGroupService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateCustomerGroupDto: UpdateCustomerGroupDto,
  ) {
    return this.customerGroupService.update(+id, updateCustomerGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.customerGroupService.remove(+id);
  }
}
