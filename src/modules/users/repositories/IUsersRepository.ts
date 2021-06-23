import User from '@modules/users/infra/typeorm/entities/User';

export default interface IUsersRepository {
  create(data: Partial<User>): Promise<User>;
  findUsername(username: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findPermissions(payload: string): Promise<User | undefined>;
}
