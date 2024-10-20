import { Controller, Get, Post, Param, Body, Delete, HttpCode, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(@Query('limit') limit?: string): Promise<Product[]> {
    const limitNumber = limit ? parseInt(limit) : undefined; // Converte o limite para um número, se fornecido
    return this.productService.findAll(limitNumber);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(+id);
  }

  @Post()
  create(@Body() product: Product): Promise<Product> {
    return this.productService.create(product);
  }

  @HttpCode(204) // Código de status HTTP 204 No Content
  @Delete('clear') // Define a rota como '/products/clear'
  async clear(): Promise<void> {
    console.log("Chamada para limpar produtos recebida");
    await this.productService.clearProducts();
    console.log("Produtos limpos com sucesso");
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    console.log("Chamada para remover um produto recebida");
    return this.productService.remove(+id);
  }

}
