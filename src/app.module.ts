import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module'
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { HashModule } from './hash/hash.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    LoggerModule,
    HashModule,
    ApiModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
