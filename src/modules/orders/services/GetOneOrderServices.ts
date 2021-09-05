import { inject, injectable } from 'tsyringe';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';

@injectable()
export default class GetOneOrderServices {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute(id: string): Promise<Order | undefined> {
    const order = await this.ordersRepository.findOrderById(id);

    return order;
  }
}
