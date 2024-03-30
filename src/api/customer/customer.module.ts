import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerGroupModule } from './customer-group/customer-group.module';
import { Customer } from 'src/database/entities/customer.entity';
import { CustomerGroup } from 'src/database/entities/customer-group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService],
  imports: [
    TypeOrmModule.forFeature([Customer, CustomerGroup]),
    CustomerGroupModule,
  ],
})
export class CustomerModule {}
