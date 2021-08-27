import { getRepository, Repository } from 'typeorm';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import Order from '@modules/orders/infra/typeorm/entities/Order';

export default class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async create(data: Partial<Order>): Promise<Order> {
    const user = this.ormRepository.create(data);
    return this.ormRepository.save(user);
  }

  public async findByUnimedProtocol(
    unimedProtocol: string,
  ): Promise<Order | undefined> {
    const findEmail = await this.ormRepository.findOne({
      where: { unimedProtocol },
    });
    return findEmail;
  }

  public async findOrderById(id: string): Promise<Order | undefined> {
    const findOrder = await this.ormRepository.findOne({
      where: { id },
    });
    return findOrder;
  }

  public async findOrderByRoom(room: string): Promise<Order | undefined> {
    const findOrder = await this.ormRepository.findOne({
      where: { room },
    });
    return findOrder;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.softDelete(id);
  }

  public async find(): Promise<Order[]> {
    const order = await this.ormRepository.find();
    return order;
  }

  public async save(order: Order): Promise<Order> {
    return this.ormRepository.save(order);
  }
}
