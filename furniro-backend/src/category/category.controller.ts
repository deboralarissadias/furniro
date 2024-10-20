import { Controller, Get, Post, Body, Param, Patch, Delete, HttpCode } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // Rota para obter todas as categorias
  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  // Rota para obter uma categoria por ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  // Rota para criar uma nova categoria
  @Post()
  async create(@Body() categoryData: Partial<Category>): Promise<Category> {
    return this.categoryService.create(categoryData);
  }

  // Rota para atualizar uma categoria por ID
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<Category>,
  ): Promise<Category> {
    return this.categoryService.update(id, updateData);
  }

  // Rota para limpar todas as categorias
  @HttpCode(204) // Código de status HTTP 204 No Content
  @Delete('clear') // Define a rota como '/categories/clear'
  async clear(): Promise<void> {
    console.log("Chamada para limpar categorias recebida");
    await this.categoryService.clearCategories();
    console.log("Categorias limpas com sucesso");
  }

  // Rota para deletar uma categoria por ID
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.categoryService.remove(id);
  }
}
