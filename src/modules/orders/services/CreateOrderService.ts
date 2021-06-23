import { inject, injectable } from 'tsyringe';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import CreateOrderDTO from '@modules/orders/dtos/CreateOrderDTO';
import AppError from '@shared/errors/AppError';

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
  }: CreateOrderDTO): Promise<Order> {
    const findByUnimedProtocol =
      await this.ordersRepository.findByUnimedProtocol(unimedProtocol);
    if (findByUnimedProtocol) {
      throw new AppError('This protocol already exist');
    }
    const order = await this.ordersRepository.create({
      name,
      unimedProtocol,
      unimedCard,
    });

    return order;
  }
}
