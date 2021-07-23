import { inject, injectable } from 'tsyringe';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import AppError from '@shared/errors/AppError';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import OrderDTO from '../dtos/OrderDTO';

type IOrder = Omit<OrderDTO, 'requester'>;

@injectable()
export default class UpdateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute(orderData: IOrder): Promise<Order> {
    const order = await this.ordersRepository.findOrderById(orderData.id);
    if (!order) {
      throw new AppError('Order not found');
    }

    Object.assign(order, { ...orderData });
    return this.ordersRepository.save(order);
  }
}
