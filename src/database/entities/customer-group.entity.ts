import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('CustomerGroup')
export class CustomerGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64 })
  name: string;
}
