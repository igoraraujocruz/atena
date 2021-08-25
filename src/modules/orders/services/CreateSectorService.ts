import { inject, injectable } from 'tsyringe';
import Sector from '@modules/orders/infra/typeorm/entities/Sector';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ISectorRepository from '@modules/orders/repositories/ISectorRepository';
import SectorDTO from '@modules/orders/dtos/SectorDTO';
import AppError from '@shared/errors/AppError';

type ISector = Omit<SectorDTO, 'id'>;

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
    order_id,
    message,
    user_id,
    isClean,
  }: ISector): Promise<Sector> {
    const findOrderById = await this.ordersRepository.findOrderById(order_id);
    if (!findOrderById) {
      throw new AppError('Order not found');
    }

    const findUsedSector = await this.sectorRepository.findRoomRequestByName(
      name,
    );

    if (findUsedSector) {
      throw new AppError('This sector is already in use');
    }

    const findSolicitationByOrder =
      await this.sectorRepository.findRoomRequestByOrder(order_id);

    if (findSolicitationByOrder) {
      throw new AppError(
        'A request for this order already exists or is already in use',
      );
    }

    const sector = await this.sectorRepository.create({
      name,
      order_id,
      message,
      user_id,
      isClean,
    });

    return sector;
  }
}
