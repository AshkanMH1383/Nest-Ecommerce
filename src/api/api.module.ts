import { Module } from '@nestjs/common';
import { UserModule } from './user/user/user.module';
import { UserAuthModule } from './user/user_auth/user_auth.module';


@Module({
  imports: [
    UserModule
  ],
  controllers: [],
  providers: [],
}) 
export class ApiModule {}
