import { inject, injectable } from 'tsyringe';
import IRoomRequestsRepository from '@modules/orders/repositories/IRoomRequestsRepository';
import AppError from '@shared/errors/AppError';

@injectable()
export default class DeleteRoomRequestService {
  constructor(
    @inject('RoomRequestsRepository')
    private roomRequestsRepository: IRoomRequestsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const findRoomRequest =
      await this.roomRequestsRepository.findRoomRequestById(id);
    if (!findRoomRequest) {
      throw new AppError('Request not found');
    }

    await this.roomRequestsRepository.delete(id);
  }
}
