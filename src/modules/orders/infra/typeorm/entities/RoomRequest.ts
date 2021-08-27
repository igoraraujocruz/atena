import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import Order from './Order';
import User from '../../../../users/infra/typeorm/entities/User';

@Entity('roomRequests')
export default class RoomRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  room: string;

  @Column()
  message: string;

  @Column()
  isClean: boolean;

  @Column()
  user_id: string;

  @Column()
  hotel_management_user_id: string;

  @ManyToOne(() => User, user => user.roomRequests)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  order_id: string;

  @OneToOne(() => Order, order => order.roomRequest)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  @Exclude()
  deletedAt?: Date;
}
