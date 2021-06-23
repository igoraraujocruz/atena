import Role from '../infra/typeorm/entities/Role';

export default interface IRoleRepository {
  findRoles(names: string[]): Promise<Role[]>;
}
