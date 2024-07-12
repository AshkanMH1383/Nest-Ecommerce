import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';

@Module({
  controllers: [],
  providers: [PasswordService],
})
export class HashModule {}
