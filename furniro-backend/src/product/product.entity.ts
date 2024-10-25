import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from '../category/category.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 10 })
  sku: string;

  // Define a relação ManyToOne com a entidade Category
  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: 'category_id' })  // Especifica o nome da coluna que vai armazenar o ID
  category: Category;

  // Explicita a coluna category_id para exibir o ID no JSON
  @Column()
  category_id: number;

  @Column({ length: 250 })
  description: string;

  @Column({ type: 'text', nullable: true })
  large_description: string | null;


  @Column('decimal')
  price: number;

  @Column('decimal', { nullable: true })
  discount_price: number | null;

  @Column('int', { nullable: true })
  discount_percent: number | null;

  @Column('boolean', { default: true })
  is_new: boolean;

  @Column({ length: 250 })
  image_link: string;

  @Column({
    type: 'text',
    nullable: true,
    transformer: {
      to: (value: string[]): string => JSON.stringify(value),
      from: (value: string): string[] => JSON.parse(value)
    }
  })
  other_images_link: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_date: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_date: Date;
}
