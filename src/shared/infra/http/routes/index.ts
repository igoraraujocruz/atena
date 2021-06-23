import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';
import authRouter from '@modules/users/infra/http/routes/auth.routes';

const routes = Router();
routes.use('/users', usersRouter);
routes.use('/orders', ordersRouter);
routes.use('/auth', authRouter);

export default routes;
