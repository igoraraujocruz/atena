import { inject, injectable } from 'tsyringe';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import AppError from '@shared/errors/AppError';

@injectable()
export default class DeleteOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const findOrderById = await this.ordersRepository.findOrderById(id);
    if (!findOrderById) {
      throw new AppError('Order not found');
    }

    await this.ordersRepository.delete(id);
  }
}
