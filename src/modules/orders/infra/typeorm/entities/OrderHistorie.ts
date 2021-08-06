import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Order from './Order';
import User from '../../../../users/infra/typeorm/entities/User';

@Entity('orderHistories')
export default class OrderHistorie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @Column()
  order_id: string;

  @ManyToOne(() => Order, order => order.orderHistories)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column()
  user_id: string;

  @ManyToOne(() => User, user => user.orderHistories)
  @JoinColumn({ name: 'user_id' })
  user: Order;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
