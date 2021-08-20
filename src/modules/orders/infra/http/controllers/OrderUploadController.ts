import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UploadOrderService from '@modules/orders/services/UploadOrderService';
import GetOrderHistorieService from '@modules/orders/services/GetOrderHistorieService';
import { classToClass } from 'class-transformer';

export default class OrderHistoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, order_id, user_id } = request.body;

    const uploadOrderDocument = container.resolve(UploadOrderService);

    const orderUpload = await uploadOrderDocument.execute({
      file: request.file?.filename,
      name,
      order_id,
      user_id,
    });

    return response.status(200).json(classToClass(orderUpload));
  }

  public async getOne(request: Request, response: Response): Promise<Response> {
    const { order_id } = request.params;

    const createOrderHistorie = container.resolve(GetOrderHistorieService);

    const orderHistorie = await createOrderHistorie.execute(order_id);

    return response.status(200).json(classToClass(orderHistorie));
  }
}
