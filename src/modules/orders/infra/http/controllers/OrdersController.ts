import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateOrderService from '@modules/orders/services/CreateOrderService';
import ListOrdersServices from '@modules/orders/services/ListOrdersServices';
import { classToClass } from 'class-transformer';
import DeleteOrderService from '@modules/orders/services/DeleteOrderService';
import UpdateOrderService from '@modules/orders/services/UpdateOrderService';
import UpdateEmergencyRoom from '@modules/orders/services/UpdateRoomService';

export default class OrdersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      unimedProtocol,
      unimedCard,
      typeOfHospitalization,
      sex,
      room = true,
    } = request.body;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({
      name,
      unimedProtocol,
      unimedCard,
      typeOfHospitalization,
      room,
      sex,
      requesterId: request.user.id,
    });

    return response.status(200).json(classToClass(order));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const {
      name,
      unimedProtocol,
      unimedCard,
      typeOfHospitalization,
      sex,
      room,
    } = request.body;

    const updateOrder = container.resolve(UpdateOrderService);

    const order = await updateOrder.execute({
      id,
      name,
      unimedProtocol,
      unimedCard,
      typeOfHospitalization,
      room,
      sex,
    });

    return response.json(order);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteOrder = container.resolve(DeleteOrderService);

    const order = await deleteOrder.execute(id);

    return response.status(204).json(order);
  }

  public async list(_: Request, response: Response): Promise<Response> {
    const listOrders = container.resolve(ListOrdersServices);

    const orders = await listOrders.execute();

    return response.json(classToClass(orders));
  }

  public async updateRoom(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.body;
    const updateRoom = container.resolve(UpdateEmergencyRoom);

    const emergencyRoomUpdated = await updateRoom.execute({
      authorizer_id: request.user.id,
      id,
    });

    return response.json(classToClass(emergencyRoomUpdated));
  }
}
