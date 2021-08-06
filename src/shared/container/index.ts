import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';

import IOrderHistoriesRepository from '@modules/orders/repositories/IOrderHistoriesRepository';
import OrderHistoriesRepository from '@modules/orders/infra/typeorm/repositories/OrderHistoriesRepository';

import IRoleRepository from '@modules/users/repositories/IRoleRepository';
import RolesRepository from '@modules/users/infra/typeorm/repositories/RolesRepository';

import '@modules/users/providers';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<IOrderHistoriesRepository>(
  'OrderHistoriesRepository',
  OrderHistoriesRepository,
);

container.registerSingleton<IRoleRepository>(
  'RolesRepository',
  RolesRepository,
);
