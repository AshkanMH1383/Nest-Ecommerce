import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('UserLogin')
export class UserLogin {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column('text')
  token: string;

  @Column({ length: 32 })
  ip: string;

  @Column({ length: 250 })
  user_agent: string;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  date_added?: Date;
}
