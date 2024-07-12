import { MongooseModule } from '@nestjs/mongoose';
import { UserAuthController } from './user_auth.controller';
import { UserAuthService } from './user_auth.service';
import { Module } from '@nestjs/common';
import { UserLogin, UserLoginSchema } from './schemas/user_login.schema';
import { PasswordService } from 'src/hash/password.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserLogin.name, schema: UserLoginSchema }]),
  ],
  controllers: [UserAuthController],
  providers: [UserAuthService, PasswordService],
})
export class UserAuthModule {}
