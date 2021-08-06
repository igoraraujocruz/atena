import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateOrderHistorieService from '@modules/orders/services/CreateOrderHistorieService';
import ListOrdersServices from '@modules/orders/services/ListOrdersServices';
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

  public async list(_: Request, response: Response): Promise<Response> {
    const listOrders = container.resolve(ListOrdersServices);

    const orders = await listOrders.execute();

    return response.json(classToClass(orders));
  }
}
