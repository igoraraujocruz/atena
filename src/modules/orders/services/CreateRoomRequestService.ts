import { inject, injectable } from 'tsyringe';
import RoomRequest from '@modules/orders/infra/typeorm/entities/RoomRequest';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import IRoomRequestsRepository from '@modules/orders/repositories/IRoomRequestsRepository';
import RoomRequestDTO from '@modules/orders/dtos/RoomRequestDTO';
import AppError from '@shared/errors/AppError';

type IRoomRequest = Omit<RoomRequestDTO, 'id'>;

@injectable()
export default class CreateDoctorService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('RoomRequestsRepository')
    private roomRequestsRepository: IRoomRequestsRepository,
  ) {}

  public async execute({
    room,
    order_id,
    message,
    user_id,
    isClean,
  }: IRoomRequest): Promise<RoomRequest> {
    const findOrderById = await this.ordersRepository.findOrderById(order_id);
    if (!findOrderById) {
      throw new AppError('Order not found');
    }

    const roomInUse = await this.ordersRepository.findOrderByRoom(room);

    if (roomInUse) {
      throw new AppError('This room is already in use');
    }

    const roomRequest = await this.roomRequestsRepository.create({
      room,
      order_id,
      message,
      user_id,
      isClean,
    });

    return roomRequest;
  }
}
