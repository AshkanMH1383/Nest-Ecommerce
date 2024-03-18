import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, default: 0 })
  parentId: number;

  @Column('text')
  image: string;

  @Column({ nullable: false, default: false })
  status: boolean;
}
