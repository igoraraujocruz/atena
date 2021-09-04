import { inject, injectable } from 'tsyringe';
import RoomRequest from '@modules/orders/infra/typeorm/entities/RoomRequest';
import IRoomRequestsRepository from '@modules/orders/repositories/IRoomRequestsRepository';
import RoomRequestDTO from '@modules/orders/dtos/RoomRequestDTO';
import AppError from '@shared/errors/AppError';

type IRoomRequest = Pick<RoomRequestDTO, 'id' | 'hotel_management_user_id'>;

@injectable()
export default class UpdateRoomRequestService {
  constructor(
    @inject('RoomRequestsRepository')
    private roomRequestsRepository: IRoomRequestsRepository,
  ) {}

  public async execute({
    id,
    hotel_management_user_id,
  }: IRoomRequest): Promise<RoomRequest> {
    const room = await this.roomRequestsRepository.findRoomRequestById(id);

    if (!room) {
      throw new AppError('Room request not found');
    }

    room.isClean = true;

    Object.assign(room, { hotel_management_user_id });
    return this.roomRequestsRepository.save(room);
  }
}
