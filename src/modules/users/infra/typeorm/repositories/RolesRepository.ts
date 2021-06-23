import { getRepository, Repository, In } from 'typeorm';
import IRoleRepository from '@modules/users/repositories/IRoleRepository';
import Role from '@modules/users/infra/typeorm/entities/Role';

export default class RoleRepository implements IRoleRepository {
  private ormRepository: Repository<Role>;

  constructor() {
    this.ormRepository = getRepository(Role);
  }

  public async findRoles(names: string[]): Promise<Role[]> {
    const roles = this.ormRepository.find({
      where: {
        name: In(names),
      },
    });

    return roles;
  }
}
