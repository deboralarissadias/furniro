import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Category } from '../category/category.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 10 })
  sku: string;

  @ManyToOne(() => Category, category => category.products)
  category: Category;

  @Column({ length: 250 })
  description: string;

  @Column({ length: 500 })
  large_description: string;

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
