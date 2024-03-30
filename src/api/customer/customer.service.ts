import { HttpException, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from 'src/database/entities/customer.entity';
import { Repository } from 'typeorm';
import { FilterCustomerDto } from './dto/filter-customer.dto';
import { Pagination } from 'src/utils/pagination';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findByUsername(username: string) {
    const customer = await this.customerRepository.findOne({
      where: {
        username,
      },
    });
    return customer;
  }

  async create(createCustomerDto: CreateCustomerDto) {
    let customers = await this.findAll({
      username: createCustomerDto.username,
      page: 1,
      limit: 1,
    });
    if (customers) {
      throw new HttpException(
        'This username has been registered by another person',
        400,
      );
    }

    customers = await this.findAll({
      email: createCustomerDto.email,
      page: 1,
      limit: 1,
    });
    if (customers) {
      throw new HttpException(
        'This email has been registered by another person',
        400,
      );
    }

    customers = await this.findAll({
      mobile: createCustomerDto.mobile,
      page: 1,
      limit: 1,
    });
    if (customers) {
      throw new HttpException(
        'This mobile has been registered by another person',
        400,
      );
    }

    if (!createCustomerDto.customerGroupId) {
      createCustomerDto.customerGroupId = 1;
    }

    const sendData = {
      ...createCustomerDto,
      customerGroup: {
        id: createCustomerDto.customerGroupId,
      },
    };

    const customer = await this.customerRepository.create(sendData);
    this.customerRepository.save(customer);
    return customer;
  }

  async findAll(filter: FilterCustomerDto) {
    const query = this.customerRepository.createQueryBuilder().select('*');

    if (filter.username) {
      query.where('username Like :username', {
        username: `%${filter.username}%`,
      });
    }

    if (filter.firstName) {
      query.where('firstName Like :firstName', {
        firstName: `%${filter.firstName}%`,
      });
    }

    if (filter.lastName) {
      query.where('lastName Like :lastName', {
        lastName: `%${filter.lastName}%`,
      });
    }

    if (filter.email) {
      query.where('email Like :email', { email: filter.email });
    }

    if (filter.mobile) {
      query.where('mobile Like :mobile', { mobile: filter.mobile });
    }

    if (filter.status) {
      query.where('status Like :status', { status: filter.status });
    }

    Pagination(query, { ...filter });

    const customers = await query.execute();

    return customers.length > 0 ? customers : false;
  }

  async findOne(id: number) {
    const customer = await this.customerRepository.findOne({
      where: {
        id,
      },
    });

    if (!customer) {
      throw new HttpException('Customer not found', 404);
    }

    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const sendData = {
      ...updateCustomerDto,
      customerGroup: {
        id: updateCustomerDto.customerGroupId,
      },
    };

    if (sendData.customerGroupId) delete sendData.customerGroupId;

    const customer = await this.customerRepository.update(+id, sendData);

    if (customer.affected === 0) {
      throw new HttpException('Customer not found', 404);
    }

    return customer;
  }

  async remove(id: number) {
    const customer = await this.customerRepository.delete(id);

    if (customer.affected === 0) {
      throw new HttpException('Customer not found', 404);
    }

    return customer;
  }
}
