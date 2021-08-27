import Order from '@modules/orders/infra/typeorm/entities/Order';

export default interface IUsersRepository {
  create(data: Partial<Order>): Promise<Order>;
  findByUnimedProtocol(unimedProtocol: string): Promise<Order | undefined>;
  findOrderById(id: string): Promise<Order | undefined>;
  findOrderByRoom(room: string): Promise<Order | undefined>;
  delete(id: string): Promise<void>;
  save(order: Order): Promise<Order>;
  find(): Promise<Order[]>;
}
