import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import OrdersController from '@modules/orders/infra/http/controllers/OrdersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import is from '@modules/users/infra/http/middlewares/permissions';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.post(
  '/',
  ensureAuthenticated,
  is(['administrator']),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      unimed_protocol: Joi.string().required(),
      unimed_card: Joi.string().required(),
    },
  }),
  ordersController.create,
);

export default ordersRouter;
