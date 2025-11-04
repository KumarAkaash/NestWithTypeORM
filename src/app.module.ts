import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/sqlite.db',
      entities: [Product],
      synchronize: true, // dev only, TypeORM creates a table named products based on the Product entity
    }),ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
