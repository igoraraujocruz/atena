import { getRepository, Repository } from 'typeorm';
import IOrderUploadRepository from '@modules/orders/repositories/IOrderUploadRepository';
import OrderUpload from '@modules/orders/infra/typeorm/entities/OrderUpload';

export default class OrderUploadRepository implements IOrderUploadRepository {
  private ormRepository: Repository<OrderUpload>;

  constructor() {
    this.ormRepository = getRepository(OrderUpload);
  }

  public async create(data: Partial<OrderUpload>): Promise<OrderUpload> {
    const user = this.ormRepository.create(data);
    return this.ormRepository.save(user);
  }

  public async findOrderUploadById(order_id: string): Promise<OrderUpload[]> {
    const findOrder = await this.ormRepository.find({
      where: { order_id },
    });
    return findOrder;
  }

  public async find(): Promise<OrderUpload[]> {
    const order = await this.ormRepository.find();
    return order;
  }

  public async save(order: OrderUpload): Promise<OrderUpload> {
    return this.ormRepository.save(order);
  }
}
