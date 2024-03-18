import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerGroupService } from './customer-group.service';
import { CreateCustomerGroupDto } from './dto/create-customer-group.dto';
import { UpdateCustomerGroupDto } from './dto/update-customer-group.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('customer-group')
@ApiTags('customer-group')
export class CustomerGroupController {
  constructor(private readonly customerGroupService: CustomerGroupService) {}

  @Post()
  create(@Body() createCustomerGroupDto: CreateCustomerGroupDto) {
    return this.customerGroupService.create(createCustomerGroupDto);
  }

  @Get()
  findAll() {
    return this.customerGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerGroupService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomerGroupDto: UpdateCustomerGroupDto) {
    return this.customerGroupService.update(+id, updateCustomerGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerGroupService.remove(+id);
  }
}
