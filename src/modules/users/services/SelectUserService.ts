import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IRoleRepository from '@modules/users/repositories/IRoleRepository';
import User from '@modules/users/infra/typeorm/entities/User';

@injectable()
export default class SelectUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RolesRepository')
    private rolesRepository: IRoleRepository,
  ) {}

  public async execute(id: string): Promise<User | undefined> {
    const users = await this.usersRepository.findById(id);
    return users;
  }
}
