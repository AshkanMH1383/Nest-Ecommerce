import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, default: 0 })
  parentId: number;

  @Column({ nullable: true, length: 255 })
  image: string;

  @Column({ nullable: false, default: false })
  status: boolean;
}
