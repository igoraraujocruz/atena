import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IRoleRepository from '../repositories/IRoleRepository';

@injectable()
export default class CreateDoctorService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('RolesRepository')
    private rolesRepository: IRoleRepository,
  ) {}

  public async execute({
    name,
    password,
    username,
    email,
    roles,
  }: CreateUserDTO): Promise<User> {
    const findUsername = await this.usersRepository.findUsername(username);
    const findByEmail = await this.usersRepository.findByEmail(email);
    const findRole = await this.rolesRepository.findRoles(roles);
    if (findUsername) {
      throw new AppError('This username already exist');
    }
    if (findByEmail) {
      throw new AppError('This email already exist');
    }

    if (findRole.length !== roles.length) {
      throw new AppError('Role not found');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      password: hashedPassword,
      username,
      email,
      roles: findRole,
    });

    return user;
  }
}
