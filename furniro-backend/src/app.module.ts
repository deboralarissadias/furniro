import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module'; // Importe o módulo de produtos

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'yourUsername',
      password: 'yourPassword',
      database: 'yourDatabase',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Detecta automaticamente as entidades
      synchronize: true,
    }),
    ProductModule, // Adicione o módulo de produtos
  ],
})
export class AppModule {}

