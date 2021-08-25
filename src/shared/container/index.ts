import { container } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';

import IOrderHistoriesRepository from '@modules/orders/repositories/IOrderHistoriesRepository';
import OrderHistoriesRepository from '@modules/orders/infra/typeorm/repositories/OrderHistoriesRepository';

import IOrderUploadRepository from '@modules/orders/repositories/IOrderUploadRepository';
import OrderUploadRepository from '@modules/orders/infra/typeorm/repositories/OrderUploadRepository';

import IRoleRepository from '@modules/users/repositories/IRoleRepository';
import RolesRepository from '@modules/users/infra/typeorm/repositories/RolesRepository';

import ISectorRepository from '@modules/orders/repositories/ISectorRepository';
import SectorRepository from '@modules/orders/infra/typeorm/repositories/SectorRepository';

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

container.registerSingleton<IOrderUploadRepository>(
  'OrderUploadRepository',
  OrderUploadRepository,
);

container.registerSingleton<IRoleRepository>(
  'RolesRepository',
  RolesRepository,
);

container.registerSingleton<ISectorRepository>(
  'SectorRepository',
  SectorRepository,
);
