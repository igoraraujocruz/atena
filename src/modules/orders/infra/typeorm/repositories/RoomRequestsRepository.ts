import { getRepository, Repository } from 'typeorm';
import IRoomRequestsRepository from '@modules/orders/repositories/IRoomRequestsRepository';
import RoomRequest from '@modules/orders/infra/typeorm/entities/RoomRequest';

export default class RoomRequestsRepository implements IRoomRequestsRepository {
  private ormRepository: Repository<RoomRequest>;

  constructor() {
    this.ormRepository = getRepository(RoomRequest);
  }

  public async create(data: Partial<RoomRequest>): Promise<RoomRequest> {
    const roomRequest = this.ormRepository.create(data);
    return this.ormRepository.save(roomRequest);
  }

  public async findRoomRequestByName(
    name: string,
  ): Promise<RoomRequest | undefined> {
    const findRoom = this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return findRoom;
  }

  public async findRoomRequestById(
    id: string,
  ): Promise<RoomRequest | undefined> {
    const findRoom = this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return findRoom;
  }

  public async findRoomRequestByOrder(
    order_id: string,
  ): Promise<RoomRequest | undefined> {
    const findRoom = this.ormRepository.findOne({
      where: {
        order_id,
      },
    });

    return findRoom;
  }

  public async find(): Promise<RoomRequest[]> {
    const rooms = await this.ormRepository.find();
    return rooms;
  }

  public async save(room: RoomRequest): Promise<RoomRequest> {
    return this.ormRepository.save(room);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.softDelete(id);
  }
}
