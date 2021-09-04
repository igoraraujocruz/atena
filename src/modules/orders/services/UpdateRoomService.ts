import { inject, injectable } from 'tsyringe';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import OrderDTO from '@modules/orders/dtos/OrderDTO';
import AppError from '@shared/errors/AppError';
import IRoomRequestsRepository from '@modules/orders/repositories/IRoomRequestsRepository';

type ISector = Pick<OrderDTO, 'id' | 'authorizer_id'>;

@injectable()
export default class UpdateRoomService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('RoomRequestsRepository')
    private roomRequestsRepository: IRoomRequestsRepository,
  ) {}

  public async execute({ id, authorizer_id }: ISector): Promise<Order> {
    const order = await this.ordersRepository.findOrderById(id);

    if (!order) {
      throw new AppError('Order not found');
    }

    const transferRoom =
      await this.roomRequestsRepository.findRoomRequestByOrder(order.id);

    const room = transferRoom?.room;

    Object.assign(order, { authorizer_id, room });
    return this.ordersRepository.save(order);
  }
}
