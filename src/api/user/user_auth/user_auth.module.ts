import { MongooseModule } from '@nestjs/mongoose';
import { UserAuthController } from './user_auth.controller';
import { UserAuthService } from './user_auth.service';
import { Module } from '@nestjs/common';
import { UserLogin, UserLoginSchema } from './schemas/user_login.schema';
import { PasswordService } from 'src/hash/password.service';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserJwtStrategy } from './user_jwt.strategy';
import { UserModule } from '../user/user.module';
import { HashModule } from 'src/hash/hash.module';
import { User, UserSchema } from '../user/schemas/user.schema';

@Module({
  imports: [
    HashModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserLogin.name, schema: UserLoginSchema }
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('USER_JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string | number>('USER_JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserAuthController],
  providers: [
    UserAuthService,
    PasswordService,
    UserService,
    UserJwtStrategy
  ],
})
export class UserAuthModule {}
