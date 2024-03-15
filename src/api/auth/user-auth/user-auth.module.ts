import { Module } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { UserAuthController } from './user-auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { UserService } from 'src/api/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { UserAuthStrategy } from './user-auth.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserAuthController],
  providers: [UserAuthService, UserService, UserAuthStrategy],
})
export class UserAuthModule {}
