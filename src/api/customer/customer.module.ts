import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerGroupModule } from './customer-group/customer-group.module';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService],
  imports: [CustomerGroupModule],
})
export class CustomerModule {}
