import { inject, injectable } from 'tsyringe';
import ISectorRepository from '@modules/orders/repositories/ISectorRepository';
import AppError from '@shared/errors/AppError';

@injectable()
export default class DeleteSectorService {
  constructor(
    @inject('SectorRepository')
    private sectorRepository: ISectorRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const findRoomRequest = await this.sectorRepository.findRoomRequestById(id);
    if (!findRoomRequest) {
      throw new AppError('Request not found');
    }

    await this.sectorRepository.delete(id);
  }
}
