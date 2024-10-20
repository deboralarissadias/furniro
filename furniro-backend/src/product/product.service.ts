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

  async findAll(limit?: number): Promise<Product[]> {
    if (limit) {
      return this.productRepository.find({ take: limit }); // Usa o parâmetro 'take' para limitar os resultados
    }
    return this.productRepository.find(); // Retorna todos os produtos
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
