import { Injectable } from '@nestjs/common';
import { CreateCustomerAuthDto } from './dto/create-customer-auth.dto';
import { UpdateCustomerAuthDto } from './dto/update-customer-auth.dto';

@Injectable()
export class CustomerAuthService {
  login(createCustomerAuthDto: CreateCustomerAuthDto) {
    return 'This action adds a new customerAuth';
  }

  register(createCustomerAuthDto: CreateCustomerAuthDto) {
    return 'This action adds a new customerAuth';
  }

}
