import { inject, injectable } from 'tsyringe';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ISectorRepository from '@modules/orders/repositories/ISectorRepository';
import OrderDTO from '@modules/orders/dtos/OrderDTO';
import AppError from '@shared/errors/AppError';

type IOrder = Omit<OrderDTO, 'id'>;

@injectable()
export default class CreateDoctorService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('SectorRepository')
    private sectorRepository: ISectorRepository,
  ) {}

  public async execute({
    name,
    unimedProtocol,
    unimedCard,
    typeOfHospitalization,
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
      typeOfHospitalization,
      sex,
      requesterId,
    });

    return order;
  }
}
