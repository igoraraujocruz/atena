import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import SelectUserService from '@modules/users/services/SelectUserService';
import { classToClass } from 'class-transformer';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, password, username, email, roles } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      password,
      username,
      email,
      roles,
    });

    return response.status(200).json(classToClass(user));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getUser = container.resolve(SelectUserService);

    const user = await getUser.execute(id);

    return response.status(200).json(classToClass(user));
  }
}
