import { NextFunction, Request, Response } from 'express';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';

export default async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const { id } = request.user;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findPermissions(id);

  const userRoles = user?.roles.map(role => role.name);

  if (!userRoles?.includes('administrator')) {
    throw new AppError('User does not have permission to execute');
  }

  return next();
}
