import { getRepository, Repository } from 'typeorm';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(data: Partial<User>): Promise<User> {
    const user = this.ormRepository.create(data);
    return this.ormRepository.save(user);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.softDelete(id);
  }

  public async findUsername(username: string): Promise<User | undefined> {
    const findUsername = await this.ormRepository.findOne({
      where: { username },
    });
    return findUsername;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findEmail = await this.ormRepository.findOne({
      where: { email },
    });
    return findEmail;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findId = await this.ormRepository.findOne({
      where: { id },
    });
    return findId;
  }

  public async findPermissions(payload: string) {
    const permissions = await this.ormRepository.findOne({
      where: { payload },
      relations: ['roles'],
    });
    return permissions;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}
