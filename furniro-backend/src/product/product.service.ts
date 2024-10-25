import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(limit?: number, sort?: 'asc' | 'desc', page?: number, categoryId?: number): Promise<{ products: Product[], currentPage: number, pageSize: number, totalProducts: number, totalPages: number }> {
    const options: any = {};
  
    // Configura a paginação
    const pageSize = limit || 10; // Número de itens por página (limit)
    const currentPage = page || 1; // Página atual
  
    options.take = pageSize; // Número de itens por página
    options.skip = (currentPage - 1) * pageSize; // Pula os itens com base na página atual
  
    // Adiciona a ordenação, se fornecida
    if (sort) {
      options.order = { price: sort };
    }
  
    // Adiciona o filtro de categoria, se fornecido
    if (categoryId) {
      options.where = { category_id: categoryId };
    }
  
    // Busca o total de produtos, sem considerar o limite e a paginação
    const totalProducts = await this.productRepository.count(options.where);
  
    // Calcula o número total de páginas
    const totalPages = Math.ceil(totalProducts / pageSize);
  
    // Busca os produtos com as opções configuradas
    const products = await this.productRepository.find(options);
  
    // Retorna os produtos e os dados de paginação
    return {
      products,
      currentPage,
      pageSize,
      totalProducts,
      totalPages
    };
  }
  
  
  findOne(id: number): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }

  create(product: Product): Promise<Product> {
    return this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    console.log(`Removendo produto com ID: ${id}`);
    await this.productRepository.delete(id);
    console.log(`Produto com ID: ${id} removido com sucesso`);
  }

  async clearProducts(): Promise<void> {
    console.log("Limpando produtos e reiniciando ID...");
    // Limpa todos os produtos
    await this.productRepository.clear();
  
    // Reinicia o contador de IDs (ajuste o nome da tabela e da sequência conforme necessário)
    await this.productRepository.query('ALTER SEQUENCE product_id_seq RESTART WITH 1');
    console.log("Limpeza e reinício concluídos");
  }
  
}