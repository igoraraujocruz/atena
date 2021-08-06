import { inject, injectable } from 'tsyringe';
import OrderHistorie from '@modules/orders/infra/typeorm/entities/OrderHistorie';
import IOrderHistoriesRepository from '@modules/orders/repositories/IOrderHistoriesRepository';
import OrderHistorieDTO from '@modules/orders/dtos/OrderHistorieDTO';

type IOrder = Omit<OrderHistorieDTO, 'id'>;

@injectable()
export default class CreateOrderHistorieService {
  constructor(
    @inject('OrderHistoriesRepository')
    private orderHistoriesRepository: IOrderHistoriesRepository,
  ) {}

  public async execute({
    message,
    order_id,
    user_id,
  }: IOrder): Promise<OrderHistorie> {
    const order = await this.orderHistoriesRepository.create({
      message,
      order_id,
      user_id,
    });

    return order;
  }
}
