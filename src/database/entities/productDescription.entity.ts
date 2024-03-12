import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { Language } from './language.entity';

@Entity('productDescription')
export class ProductDescription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @ManyToOne(() => Language, (language) => language.id)
  language: Language;

  @Column({ nullable: false, length: 255 })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  tag: string;

  @Column({ nullable: false, length: 255 })
  metaTitle: string;

  @Column({ nullable: true, length: 255 })
  metaDescription: string;

  @Column({ nullable: true, length: 255 })
  metaKeyword: string;
}
