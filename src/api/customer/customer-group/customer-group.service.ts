import { Injectable } from '@nestjs/common';
import { CreateCustomerGroupDto } from './dto/create-customer-group.dto';
import { UpdateCustomerGroupDto } from './dto/update-customer-group.dto';

@Injectable()
export class CustomerGroupService {
  create(createCustomerGroupDto: CreateCustomerGroupDto) {
    return 'This action adds a new customerGroup';
  }

  findAll() {
    return `This action returns all customerGroup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customerGroup`;
  }

  update(id: number, updateCustomerGroupDto: UpdateCustomerGroupDto) {
    return `This action updates a #${id} customerGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} customerGroup`;
  }
}
