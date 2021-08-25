import Sector from '../infra/typeorm/entities/Sector';

export default interface ISectorRepository {
  create(data: Partial<Sector>): Promise<Sector>;
  save(sector: Sector): Promise<Sector>;
  find(): Promise<Sector[]>;
  findRoomRequestByName(name: string): Promise<Sector | undefined>;
  findRoomRequestById(id: string): Promise<Sector | undefined>;
  findRoomRequestByOrder(order_id: string): Promise<Sector | undefined>;
  delete(id: string): Promise<void>;
}
