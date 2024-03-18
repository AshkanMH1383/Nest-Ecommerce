import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserGroup } from './user-group.entity';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserGroup, (userGroup) => userGroup.id)
  userGroup: UserGroup;

  @Column({ nullable: false, length: 20 })
  username: string;

  @Column({ nullable: true, length: 255 })
  password: string;

  @Column({ nullable: true, length: 32 })
  firstName: string;

  @Column({ nullable: true, length: 32 })
  lastName: string;

  @Column({ nullable: true, length: 96 })
  email: string;

  @Column({ nullable: true, length: 20 })
  mobile: string;

  @Column('text')
  image: string;

  @Column({ nullable: false, default: false })
  status: boolean;
}
