import { getRepository, Repository } from 'typeorm';
import ISectorRepository from '@modules/orders/repositories/ISectorRepository';
import Sector from '@modules/orders/infra/typeorm/entities/Sector';

export default class SectorRepository implements ISectorRepository {
  private ormRepository: Repository<Sector>;

  constructor() {
    this.ormRepository = getRepository(Sector);
  }

  public async create(data: Partial<Sector>): Promise<Sector> {
    const sector = this.ormRepository.create(data);
    return this.ormRepository.save(sector);
  }

  public async findRoomRequestByName(
    name: string,
  ): Promise<Sector | undefined> {
    const findSector = this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return findSector;
  }

  public async findRoomRequestById(id: string): Promise<Sector | undefined> {
    const findSector = this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return findSector;
  }

  public async findRoomRequestByOrder(
    order_id: string,
  ): Promise<Sector | undefined> {
    const findSolicitation = this.ormRepository.findOne({
      where: {
        order_id,
      },
    });

    return findSolicitation;
  }

  public async find(): Promise<Sector[]> {
    const order = await this.ormRepository.find();
    return order;
  }

  public async save(sector: Sector): Promise<Sector> {
    return this.ormRepository.save(sector);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.softDelete(id);
  }
}
