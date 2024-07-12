import { Module } from '@nestjs/common';
import { MongoDBModule } from './mongo/mongodb.module';

@Module({
    imports: [
       MongoDBModule
    ],
    controllers: [],
    providers: [],
})
export class DatabaseModule {}



