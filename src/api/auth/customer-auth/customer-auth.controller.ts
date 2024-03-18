import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerAuthService } from './customer-auth.service';
import { CreateCustomerAuthDto } from './dto/create-customer-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('customer-auth')
@ApiTags('customer-auth')
export class CustomerAuthController {
  constructor(private readonly customerAuthService: CustomerAuthService) {}

  @Post('login')
  login(@Body() createCustomerAuthDto: CreateCustomerAuthDto) {
    return this.customerAuthService.login(createCustomerAuthDto);
  }

  @Post('register')
  register(@Body() createCustomerAuthDto: CreateCustomerAuthDto) {
    return this.customerAuthService.register(createCustomerAuthDto);
  }
}
