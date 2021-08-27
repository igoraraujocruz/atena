import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';
import ordersHistoriesRouter from '@modules/orders/infra/http/routes/orderHistories.routes';
import orderUploadsRouter from '@modules/orders/infra/http/routes/orderUploads.routes';
import roomRequestsRouter from '@modules/orders/infra/http/routes/roomRequests.routes';
import authRouter from '@modules/users/infra/http/routes/auth.routes';

const routes = Router();
routes.use('/users', usersRouter);
routes.use('/orders', ordersRouter);
routes.use('/orders/history', ordersHistoriesRouter);
routes.use('/orders/upload', orderUploadsRouter);
routes.use('/orders/roomRequests', roomRequestsRouter);
routes.use('/sessions', authRouter);

export default routes;
