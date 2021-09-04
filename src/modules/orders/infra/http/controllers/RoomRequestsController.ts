import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateRoomRequestService from '@modules/orders/services/CreateRoomRequestService';
import UpdateRoomRequestService from '@modules/orders/services/UpdateRoomRequestService';
import DeleteRoomRequestService from '@modules/orders/services/DeleteRoomRequestService';
import { classToClass } from 'class-transformer';

export default class RoomRequestsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { room, order_id, message, isClean = false } = request.body;

    const createRoomRequest = container.resolve(CreateRoomRequestService);

    const requestRoom = await createRoomRequest.execute({
      room,
      order_id,
      message,
      isClean,
      user_id: request.user.id,
    });

    return response.status(200).json(classToClass(requestRoom));
  }

  public async updateIsClean(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const updateIsClean = container.resolve(UpdateRoomRequestService);

    const roomUpdated = await updateIsClean.execute({
      id,
      hotel_management_user_id: request.user.id,
    });

    return response.json(classToClass(roomUpdated));
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteRoomRequest = container.resolve(DeleteRoomRequestService);

    const room = await deleteRoomRequest.execute(id);

    return response.status(204).json(room);
  }
}
