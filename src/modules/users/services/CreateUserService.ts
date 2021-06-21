import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';

@injectable()
export default class CreateDoctorService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    name,
    password,
    username,
    email,
  }: CreateUserDTO): Promise<User> {
    const findUsername = await this.usersRepository.findUsername(username);
    const findByEmail = await this.usersRepository.findByEmail(email);
    if (findUsername) {
      throw new AppError('This username already exist');
    }
    if (findByEmail) {
      throw new AppError('This email already exist');
    }
    const hashedPassword = await hash(password, 8);
    const user = await this.usersRepository.create({
      name,
      password: hashedPassword,
      username,
      email,
    });

    return user;
  }
}
