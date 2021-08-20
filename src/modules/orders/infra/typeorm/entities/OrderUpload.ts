import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import Order from './Order';
import User from '../../../../users/infra/typeorm/entities/User';

@Entity('uploads')
export default class OrderUploads {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  file: string;

  @Column()
  name: string;

  @Column()
  @Exclude()
  order_id: string;

  @ManyToOne(() => Order, order => order.uploads)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column()
  @Exclude()
  user_id: string;

  @ManyToOne(() => User, user => user.uploads)
  @JoinColumn({ name: 'user_id' })
  user: Order;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  @Exclude()
  deletedAt?: Date;
}
