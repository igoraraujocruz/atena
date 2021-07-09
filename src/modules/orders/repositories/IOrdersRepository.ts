import Order from '@modules/orders/infra/typeorm/entities/Order';

export default interface IUsersRepository {
  create(data: Partial<Order>): Promise<Order>;
  findByUnimedProtocol(unimedProtocol: string): Promise<Order | undefined>;
  find(): Promise<Order[]>;
}
