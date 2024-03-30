import { Controller, Post, Body } from '@nestjs/common';
import { CustomerAuthService } from './customer-auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginCustomerAuthDto } from './dto/login-customer-auth.dto';
import { RegisterCustomerAuthDto } from './dto/register-customer-auth.dto';

@Controller('customer-auth')
@ApiTags('customer-auth')
export class CustomerAuthController {
  constructor(private readonly customerAuthService: CustomerAuthService) {}

  @Post('login')
  login(@Body() loginCustomerAuthDto: LoginCustomerAuthDto) {
    return this.customerAuthService.login(loginCustomerAuthDto);
  }

  @Post('register')
  register(@Body() registerCustomerAuthDto: RegisterCustomerAuthDto) {
    return this.customerAuthService.register(registerCustomerAuthDto);
  }
}
