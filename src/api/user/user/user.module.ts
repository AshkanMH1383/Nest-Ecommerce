import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { User, UserSchema } from './schemas/user.schema';
import { PasswordService } from 'src/hash/password.service';
import { UserAuthModule } from '../user_auth/user_auth.module';

@Module({
  imports: [
    UserAuthModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, PasswordService],
})
export class UserModule {}
