import { inject, injectable } from 'tsyringe';
import OrderHistorie from '@modules/orders/infra/typeorm/entities/OrderHistorie';
import IOrderHistoriesRepository from '@modules/orders/repositories/IOrderHistoriesRepository';

@injectable()
export default class GetOrderHistorieService {
  constructor(
    @inject('OrderHistoriesRepository')
    private orderHistoriesRepository: IOrderHistoriesRepository,
  ) {}

  public async execute(order_id: string): Promise<OrderHistorie[]> {
    const order = await this.orderHistoriesRepository.findOrderHistorieById(
      order_id,
    );

    return order;
  }
}
