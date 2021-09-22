import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import OrderUploadController from '@modules/orders/infra/http/controllers/OrderUploadController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import multer from 'multer';

const orderUploadsRouter = Router();
const orderUploadsController = new OrderUploadController();
const upload = multer(uploadConfig.multer);

orderUploadsRouter.post(
  '/',
  ensureAuthenticated,
  upload.single('file'),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      order_id: Joi.string().required().uuid(),
      user_id: Joi.string().required().uuid(),
      message: Joi.string().optional().allow(''),
    },
  }),
  orderUploadsController.create,
);

orderUploadsRouter.get(
  '/:order_id',
  ensureAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      order_id: Joi.string().uuid().required(),
    },
  }),
  orderUploadsController.getAllByOrderId,
);

export default orderUploadsRouter;
