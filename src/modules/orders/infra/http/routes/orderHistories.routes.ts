import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import OrderHistoriesController from '@modules/orders/infra/http/controllers/OrderHistoriesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const ordersHistoriesRouter = Router();
const ordersHistoriesController = new OrderHistoriesController();

ordersHistoriesRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      message: Joi.string().required(),
      order_id: Joi.string().required(),
      user_id: Joi.string().required(),
    },
  }),
  ordersHistoriesController.create,
);

ordersHistoriesRouter.get(
  '/:order_id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      order_id: Joi.string().uuid().required(),
    },
  }),
  ordersHistoriesController.getOne,
);

export default ordersHistoriesRouter;
