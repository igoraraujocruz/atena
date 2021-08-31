import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UploadOrderService from '@modules/orders/services/UploadOrderService';
import GetUploadOrderService from '@modules/orders/services/GetUploadOrderService';
import { classToClass } from 'class-transformer';

export default class OrderUploadController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, order_id, user_id, message } = request.body;
    const file = request.file?.filename;

    const uploadOrderDocument = container.resolve(UploadOrderService);

    const orderUpload = await uploadOrderDocument.execute({
      file,
      url: `${process.env.APP_API_URL}/files/${file}`,
      name,
      order_id,
      user_id,
      message,
    });

    return response.status(200).json(classToClass(orderUpload));
  }

  public async getAllByOrderId(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { order_id } = request.params;

    const getUploadsOrder = container.resolve(GetUploadOrderService);

    const uploadOrder = await getUploadsOrder.execute(order_id);

    return response.status(200).json(classToClass(uploadOrder));
  }
}
