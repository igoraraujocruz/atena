import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import User from '../../../../users/infra/typeorm/entities/User';
import OrderHistorie from './OrderHistorie';
import OrderUpload from './OrderUpload';
import RoomRequest from './RoomRequest';

@Entity('orders')
export default class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    name: 'unimed_protocol',
  })
  unimedProtocol: string;

  @Column({
    name: 'unimed_card',
  })
  unimedCard: string;

  @Column({
    name: 'type_of_hospitalization',
  })
  typeOfHospitalization: string;

  @Column()
  sex: string;

  @Column()
  authorizer_id: string;

  @Column()
  room: string;

  @Column({ name: 'requester_id' })
  requesterId: string;

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: 'requester_id' })
  requester: User;

  @OneToMany(() => OrderHistorie, orderHistorie => orderHistorie.order, {
    eager: true,
  })
  orderHistories: OrderHistorie[];

  @OneToMany(() => OrderUpload, upload => upload.order, {
    eager: true,
  })
  uploads: OrderUpload[];

  @OneToOne(() => RoomRequest, roomRequest => roomRequest.order, {
    eager: true,
  })
  roomRequest: RoomRequest;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  @Exclude()
  deletedAt?: Date;
}
