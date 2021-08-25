import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateSectorService from '@modules/orders/services/CreateSectorService';
import UpdateSectorService from '@modules/orders/services/UpdateSectorService';
import DeleteSectorService from '@modules/orders/services/DeleteSectorService';
import { classToClass } from 'class-transformer';

export default class OrderHistoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, order_id, message, isClean = false } = request.body;

    const createRequest = container.resolve(CreateSectorService);

    const requestSector = await createRequest.execute({
      name,
      order_id,
      message,
      isClean,
      user_id: request.user.id,
    });

    return response.status(200).json(classToClass(requestSector));
  }

  public async updateIsClean(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.body;
    const updateUserAvatar = container.resolve(UpdateSectorService);

    const sectorUpdated = await updateUserAvatar.execute({
      id,
      hotel_management_user_id: request.user.id,
    });

    return response.json(classToClass(sectorUpdated));
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteSector = container.resolve(DeleteSectorService);

    const sector = await deleteSector.execute(id);

    return response.status(204).json(sector);
  }
}
