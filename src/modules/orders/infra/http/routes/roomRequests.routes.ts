import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import RoomRequestsController from '@modules/orders/infra/http/controllers/RoomRequestsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const roomRequestsRouter = Router();
const roomRequestsController = new RoomRequestsController();

roomRequestsRouter.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      room: Joi.string().required(),
      order_id: Joi.string().required().uuid(),
      message: Joi.string(),
    },
  }),
  roomRequestsController.create,
);

roomRequestsRouter.patch(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required().uuid(),
    },
  }),
  roomRequestsController.updateIsClean,
);

roomRequestsRouter.delete(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
  }),
  roomRequestsController.remove,
);

export default roomRequestsRouter;
