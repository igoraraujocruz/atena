import User from '@modules/users/infra/typeorm/entities/User';

export default interface IUsersRepository {
  create(data: Partial<User>): Promise<User>;
}
