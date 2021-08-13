import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateOrderHistorieService from '@modules/orders/services/CreateOrderHistorieService';
import GetOrderHistorieService from '@modules/orders/services/GetOrderHistorieService';
import { classToClass } from 'class-transformer';

export default class OrderHistoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { message, order_id, user_id } = request.body;

    const createOrderHistorie = container.resolve(CreateOrderHistorieService);

    const orderHistorie = await createOrderHistorie.execute({
      message,
      order_id,
      user_id,
    });

    return response.status(200).json(classToClass(orderHistorie));
  }

  public async getOne(request: Request, response: Response): Promise<Response> {
    const { order_id } = request.params;

    const createOrderHistorie = container.resolve(GetOrderHistorieService);

    const orderHistorie = await createOrderHistorie.execute(order_id);

    return response.status(200).json(classToClass(orderHistorie));
  }
}
