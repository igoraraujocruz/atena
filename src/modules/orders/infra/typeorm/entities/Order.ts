import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import User from '../../../../users/infra/typeorm/entities/User';

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
  sector: string;

  @Column()
  sex: string;

  @Column({ name: 'requester_id' })
  requesterId: string;

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: 'requester_id' })
  requester: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  @Exclude()
  deletedAt?: Date;
}
