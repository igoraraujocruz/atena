import { inject, injectable } from 'tsyringe';
import Sector from '@modules/orders/infra/typeorm/entities/Sector';
import ISectorRepository from '@modules/orders/repositories/ISectorRepository';
import SectorDTO from '@modules/orders/dtos/SectorDTO';
import AppError from '@shared/errors/AppError';

type ISector = Pick<SectorDTO, 'id' | 'hotel_management_user_id'>;

@injectable()
export default class CreateDoctorService {
  constructor(
    @inject('SectorRepository')
    private sectorRepository: ISectorRepository,
  ) {}

  public async execute({
    id,
    hotel_management_user_id,
  }: ISector): Promise<Sector> {
    const room = await this.sectorRepository.findRoomRequestById(id);

    if (!room) {
      throw new AppError('Room request not found');
    }

    room.isClean = true;

    Object.assign(room, { hotel_management_user_id });
    return this.sectorRepository.save(room);
  }
}
