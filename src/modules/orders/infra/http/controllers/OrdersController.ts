import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateOrderService from '@modules/orders/services/CreateOrderService';
import ListOrdersServices from '@modules/orders/services/ListOrdersServices';
import { classToClass } from 'class-transformer';

export default class OrdersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      unimed_protocol,
      unimed_card,
      type_of_hospitalization,
      sector,
      sex,
    } = request.body;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({
      name,
      unimedProtocol: unimed_protocol,
      unimedCard: unimed_card,
      typeOfHospitalization: type_of_hospitalization,
      sector,
      sex,
      requester: request.user.id,
    });

    console.log(request.user.id);

    return response.status(200).json(classToClass(order));
  }

  public async list(_: Request, response: Response): Promise<Response> {
    const listOrders = container.resolve(ListOrdersServices);

    const orders = await listOrders.execute();

    return response.json(classToClass(orders));
  }
}
