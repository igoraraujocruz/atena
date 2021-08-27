import RoomRequest from '../infra/typeorm/entities/RoomRequest';

export default interface IRoomRequestsRepository {
  create(data: Partial<RoomRequest>): Promise<RoomRequest>;
  save(room: RoomRequest): Promise<RoomRequest>;
  find(): Promise<RoomRequest[]>;
  findRoomRequestByName(name: string): Promise<RoomRequest | undefined>;
  findRoomRequestById(id: string): Promise<RoomRequest | undefined>;
  findRoomRequestByOrder(order_id: string): Promise<RoomRequest | undefined>;
  delete(id: string): Promise<void>;
}
