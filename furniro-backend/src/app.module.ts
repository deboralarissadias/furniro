import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module'; // Importe o módulo de produtos
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'furniro_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Detecta automaticamente as entidades
      synchronize: true,
    }),
    CategoryModule,
    ProductModule,
  ],
})
export class AppModule {}

