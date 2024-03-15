import { Module } from '@nestjs/common';
import { CustomerAuthModule } from './customer-auth/customer-auth.module';
import { UserAuthModule } from './user-auth/user-auth.module';

@Module({
  controllers: [],
  providers: [],
  imports: [UserAuthModule, CustomerAuthModule],
})
export class AuthModule {}
