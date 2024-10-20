import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  // Retornar todas as categorias
  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  // Retornar uma categoria pelo ID
  async findOne(id: number): Promise<Category> {
    return await this.categoryRepository.findOneBy({ id });
  }

  // Criar uma nova categoria
  async create(categoryData: Partial<Category>): Promise<Category> {
    const category = this.categoryRepository.create(categoryData);
    return await this.categoryRepository.save(category);
  }

  // Atualizar uma categoria pelo ID
  async update(id: number, updateData: Partial<Category>): Promise<Category> {
    await this.categoryRepository.update(id, updateData);
    return this.findOne(id);
  }

  // Deletar uma categoria pelo ID
  async remove(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
