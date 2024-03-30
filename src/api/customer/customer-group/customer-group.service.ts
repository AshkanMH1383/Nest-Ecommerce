import { HttpException, Injectable } from '@nestjs/common';
import { CreateCustomerGroupDto } from './dto/create-customer-group.dto';
import { UpdateCustomerGroupDto } from './dto/update-customer-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerGroup } from 'src/database/entities/customer-group.entity';
import { FilterCustomerGroupDto } from './dto/filter-customer-group.dto';
import { Pagination } from 'src/utils/pagination';

@Injectable()
export class CustomerGroupService {
  constructor(
    @InjectRepository(CustomerGroup)
    private customerGroupRepository: Repository<CustomerGroup>,
  ) {}

  async create(createCustomerGroupDto: CreateCustomerGroupDto) {
    const new_customer_group = await this.customerGroupRepository.save(
      createCustomerGroupDto,
    );
    return new_customer_group;
  }

  async findAll(filter: FilterCustomerGroupDto) {
    const query = this.customerGroupRepository.createQueryBuilder().select('*');

    if (filter.name) {
      query.where('name Like :name', { name: `%${filter.name}%` });
    }

    Pagination(query, { ...filter });

    return await query.execute();
  }

  async findOne(id: number) {
    const customer_group = await this.customerGroupRepository.findOne({
      where: {
        id,
      },
    });

    if (!customer_group) {
      throw new HttpException('User Group not found', 404);
    }

    return customer_group;
  }

  async update(id: number, updateCustomerGroupDto: UpdateCustomerGroupDto) {
    const customer_group = await this.customerGroupRepository.update(
      +id,
      updateCustomerGroupDto,
    );

    if (customer_group.affected === 0) {
      throw new HttpException('User Group not found', 404);
    }

    return customer_group;
  }

  async remove(id: number) {
    const customer_group = await this.customerGroupRepository.delete(id);

    if (customer_group.affected === 0) {
      throw new HttpException('User Group not found', 404);
    }

    return customer_group;
  }
}
