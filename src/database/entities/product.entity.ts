import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, length: 64 })
  model: string;

  @Column({ nullable: true, length: 64 })
  sku: string;

  @Column({ nullable: true, length: 12 })
  upc: string;

  @Column({ nullable: true, length: 14 })
  ean: string;

  @Column({ nullable: true, length: 13 })
  jan: string;

  @Column({ nullable: true, length: 17 })
  isbn: string;

  @Column({ nullable: true, length: 64 })
  mpn: string;

  @Column({ nullable: true, length: 128 })
  location: string;

  @Column({ nullable: false })
  quantity: number;

  @Column()
  price: number;
}
