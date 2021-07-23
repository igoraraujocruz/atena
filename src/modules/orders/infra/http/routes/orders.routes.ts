import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import OrdersController from '@modules/orders/infra/http/controllers/OrdersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureDoctorElective from '@modules/users/infra/http/middlewares/ensureDoctorElective';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.post(
  '/',
  ensureAuthenticated,
  // ensureDoctorElective,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      unimedProtocol: Joi.string().required(),
      unimedCard: Joi.string().required(),
      typeOfHospitalization: Joi.string().required(),
      sector: Joi.string().required(),
      sex: Joi.string().required(),
    },
  }),
  ordersController.create,
);

ordersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ordersController.delete,
);

ordersRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      unimedProtocol: Joi.string().required(),
      unimedCard: Joi.string().required(),
      typeOfHospitalization: Joi.string().required(),
      sector: Joi.string().required(),
      sex: Joi.string().required(),
    },
  }),
  ordersController.update,
);

ordersRouter.get(
  '/',
  // ensureAuthenticated,
  // ensureDoctorElective,
  ordersController.list,
);

export default ordersRouter;
