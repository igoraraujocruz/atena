import OrderHistorie from '@modules/orders/infra/typeorm/entities/OrderHistorie';

export default interface IOrderHistoriesRepository {
  create(data: Partial<OrderHistorie>): Promise<OrderHistorie>;
  findOrderHistorieById(order_id: string): Promise<OrderHistorie[]>;
  save(order: OrderHistorie): Promise<OrderHistorie>;
  find(): Promise<OrderHistorie[]>;
}
