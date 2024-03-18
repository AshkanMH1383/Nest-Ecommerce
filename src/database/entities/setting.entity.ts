import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Setting')
export class Setting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 128 })
  code: string;

  @Column('text')
  value: string;
}
