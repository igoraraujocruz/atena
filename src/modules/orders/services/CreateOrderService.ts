import { inject, injectable } from 'tsyringe';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import OrderDTO from '@modules/orders/dtos/OrderDTO';
import AppError from '@shared/errors/AppError';

type IOrder = Omit<OrderDTO, 'id'>;

@injectable()
export default class CreateDoctorService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({
    name,
    unimedProtocol,
    unimedCard,
    typeOfHospitalization,
    emergency_room,
    sex,
    requesterId,
  }: IOrder): Promise<Order> {
    const findByUnimedProtocol =
      await this.ordersRepository.findByUnimedProtocol(unimedProtocol);
    if (findByUnimedProtocol) {
      throw new AppError('This protocol already exist');
    }

    const order = await this.ordersRepository.create({
      name,
      unimedProtocol,
      unimedCard,
      emergency_room,
      typeOfHospitalization,
      sex,
      requesterId,
    });

    return order;
  }
}
