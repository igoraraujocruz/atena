import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

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

  @Column()
  requester: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  @Exclude()
  deletedAt?: Date;
}
