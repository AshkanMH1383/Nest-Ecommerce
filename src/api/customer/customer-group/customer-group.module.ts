import { Module } from '@nestjs/common';
import { CustomerGroupService } from './customer-group.service';
import { CustomerGroupController } from './customer-group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerGroup } from 'src/database/entities/customer-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerGroup])],
  controllers: [CustomerGroupController],
  providers: [CustomerGroupService],
})
export class CustomerGroupModule {}
