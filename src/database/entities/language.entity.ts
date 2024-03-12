import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('language')
export class Language {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 32 })
  name: string;

  @Column({ nullable: false, length: 5 })
  code: string;

  @Column({ nullable: false, default: 0 })
  sortOrder: number;

  @Column({ nullable: false, default: false })
  status: boolean;
}
