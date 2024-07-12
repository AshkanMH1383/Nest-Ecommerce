import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module'
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { HashModule } from './hash/hash.module';


@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    HashModule,
    ApiModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
