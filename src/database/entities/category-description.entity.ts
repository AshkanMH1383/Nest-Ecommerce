import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Language } from './language.entity';
import { Category } from './category.entity';

@Entity('CategoryDescription')
export class CategoryDescription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Category, (category) => category.id)
  category: Category;

  @ManyToOne(() => Language, (language) => language.id)
  language: Language;

  @Column({ nullable: false, length: 255 })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: false, length: 255 })
  metaTitle: string;

  @Column('text')
  metaDescription: string;

  @Column('text')
  metaKeyword: string;
}
