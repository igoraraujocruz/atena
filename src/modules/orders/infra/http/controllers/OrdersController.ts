import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateOrderService from '@modules/orders/services/CreateOrderService';
import { classToClass } from 'class-transformer';

export default class OrdersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, unimed_protocol, unimed_card } = request.body;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({
      name,
      unimedProtocol: unimed_protocol,
      unimedCard: unimed_card,
    });

    return response.status(200).json(classToClass(order));
  }
}
