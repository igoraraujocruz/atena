import { inject, injectable } from 'tsyringe';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import OrderDTO from '@modules/orders/dtos/OrderDTO';
import AppError from '@shared/errors/AppError';

type ISector = Pick<OrderDTO, 'id' | 'authorizer_id' | 'room'>;

@injectable()
export default class CreateDoctorService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ id, authorizer_id, room }: ISector): Promise<Order> {
    const order = await this.ordersRepository.findOrderById(id);

    if (!order) {
      throw new AppError('Order not found');
    }

    const findOrderByRoom = await this.ordersRepository.findOrderByRoom(room);

    if (findOrderByRoom) {
      throw new AppError('This room is already in use');
    }

    Object.assign(order, { authorizer_id, room });
    return this.ordersRepository.save(order);
  }
}
