import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import UsersController from '@modules/users/infra/http/controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      password: Joi.string().required(),
      username: Joi.string().required(),
      email: Joi.string().email(),
      roles: Joi.array().required(),
    },
  }),
  usersController.create,
);

usersRouter.get('/:id', usersController.index);

export default usersRouter;
