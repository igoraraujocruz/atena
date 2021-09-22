import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import Order from '../../../../orders/infra/typeorm/entities/Order';
import RoomRequest from '../../../../orders/infra/typeorm/entities/RoomRequest';
import OrderHistorie from '../../../../orders/infra/typeorm/entities/OrderHistorie';
import OrderUpload from '../../../../orders/infra/typeorm/entities/OrderUpload';
import Role from './Role';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'users_roles',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'role_id' }],
  })
  roles: Role[];

  @OneToMany(() => Order, order => order.requester)
  orders: Order[];

  @OneToMany(() => RoomRequest, roomRequest => roomRequest.user)
  roomRequests: RoomRequest[];

  @OneToMany(() => OrderHistorie, orderHistorie => orderHistorie.user, {
    eager: true,
  })
  orderHistories: OrderHistorie[];

  @OneToMany(() => OrderUpload, upload => upload.user, {
    eager: true,
  })
  uploads: OrderUpload[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  @Exclude()
  deletedAt?: Date;
}
