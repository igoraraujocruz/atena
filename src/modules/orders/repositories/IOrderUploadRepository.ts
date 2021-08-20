import OrderUpload from '@modules/orders/infra/typeorm/entities/OrderUpload';

export default interface IOrderUploadRepository {
  create(data: Partial<OrderUpload>): Promise<OrderUpload>;
  findOrderUploadById(order_id: string): Promise<OrderUpload[]>;
  save(order: OrderUpload): Promise<OrderUpload>;
  find(): Promise<OrderUpload[]>;
}
