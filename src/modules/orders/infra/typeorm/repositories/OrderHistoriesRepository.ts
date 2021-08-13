import { getRepository, Repository } from 'typeorm';
import IOrderHistoriesRepository from '@modules/orders/repositories/IOrderHistoriesRepository';
import OrderHistorie from '@modules/orders/infra/typeorm/entities/OrderHistorie';

export default class OrderHistoriesRepository
  implements IOrderHistoriesRepository
{
  private ormRepository: Repository<OrderHistorie>;

  constructor() {
    this.ormRepository = getRepository(OrderHistorie);
  }

  public async create(data: Partial<OrderHistorie>): Promise<OrderHistorie> {
    const user = this.ormRepository.create(data);
    return this.ormRepository.save(user);
  }

  public async findOrderHistorieById(
    order_id: string,
  ): Promise<OrderHistorie[]> {
    const findOrder = await this.ormRepository.find({
      where: { order_id },
    });
    return findOrder;
  }

  public async find(): Promise<OrderHistorie[]> {
    const order = await this.ormRepository.find();
    return order;
  }

  public async save(order: OrderHistorie): Promise<OrderHistorie> {
    return this.ormRepository.save(order);
  }
}
