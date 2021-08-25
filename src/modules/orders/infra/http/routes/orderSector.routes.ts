import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import SectorController from '@modules/orders/infra/http/controllers/SectorController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const orderSectorRouter = Router();
const orderSectorController = new SectorController();

orderSectorRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      order_id: Joi.string().required().uuid(),
      message: Joi.string(),
    },
  }),
  orderSectorController.create,
);

orderSectorRouter.patch(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required().uuid(),
    },
  }),
  orderSectorController.updateIsClean,
);

orderSectorRouter.delete(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
  }),
  orderSectorController.remove,
);

export default orderSectorRouter;
