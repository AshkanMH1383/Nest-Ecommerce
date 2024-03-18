import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../database/entities/user.entity';
import { UserGroupModule } from './user-group/user-group.module';
import { UserGroup } from 'src/database/entities/user-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserGroup]), UserGroupModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
