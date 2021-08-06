import OrderHistorie from '@modules/orders/infra/typeorm/entities/OrderHistorie';

export default interface IOrderHistoriesRepository {
  create(data: Partial<OrderHistorie>): Promise<OrderHistorie>;
  findOrderById(id: string): Promise<OrderHistorie | undefined>;
  save(order: OrderHistorie): Promise<OrderHistorie>;
  find(): Promise<OrderHistorie[]>;
}
