import { inject, injectable } from 'tsyringe';
import OrderUpload from '@modules/orders/infra/typeorm/entities/OrderUpload';
import IOrderUploadRepository from '@modules/orders/repositories/IOrderUploadRepository';
import OrderUploadDTO from '@modules/orders/dtos/OrderUploadDTO';

type IOrder = Omit<OrderUploadDTO, 'id'>;

@injectable()
export default class UploadOrderService {
  constructor(
    @inject('OrderUploadRepository')
    private orderUploadRepository: IOrderUploadRepository,
  ) {}

  public async execute({
    file,
    url,
    name,
    order_id,
    user_id,
    message,
  }: IOrder): Promise<OrderUpload> {
    const orderUpload = await this.orderUploadRepository.create({
      file,
      url,
      name,
      order_id,
      user_id,
      message,
    });

    return orderUpload;
  }
}
