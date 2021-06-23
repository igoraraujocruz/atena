import { Request, Response, NextFunction } from 'express';
import User from '@modules/users/infra/typeorm/entities/User';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';
import { decode } from 'jsonwebtoken';

async function decoder(request: Request): Promise<User | undefined> {
  const authHeader = request.headers.authorization || '';
  const usersRepository = getCustomRepository(UsersRepository);

  const [, token] = authHeader?.split(' ');

  const payload = decode(token);

  const user = await usersRepository.findPermissions(payload?.sub as string);

  return user;
}

export default function is(teste: String[]) {
  const roleAuthorized = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    const user = await decoder(request);

    const userRoles = user?.roles.map(role => role.name);

    const existsRoles = userRoles?.some(r => teste.includes(r));

    if (existsRoles) {
      return next();
    }

    return response.status(401).json({ message: 'Not authorized!' });
  };

  return roleAuthorized;
}
