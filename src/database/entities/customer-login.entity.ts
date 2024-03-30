import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Customer } from './customer.entity';

@Entity('CustomerLogin')
export class CustomerLogin {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.id)
  customer: Customer;

  @Column('text')
  token: string;

  @Column({ length: 32 })
  ip: string;

  @Column({ length: 250 })
  user_agent: string;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  date_added?: Date;
}
