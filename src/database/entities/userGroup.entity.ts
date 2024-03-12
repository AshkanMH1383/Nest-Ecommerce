import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('userGroup')
export class UserGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64 })
  name: string;

  @Column()
  permission: string;
}
