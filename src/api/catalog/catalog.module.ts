import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';

@Module({
  controllers: [],
  providers: [],
  imports: [ProductModule, CategoryModule],
})
export class CatalogModule {}
