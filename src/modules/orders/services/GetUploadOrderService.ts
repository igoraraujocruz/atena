import { inject, injectable } from 'tsyringe';
import OrderUpload from '@modules/orders/infra/typeorm/entities/OrderUpload';
import IOrderUploadRepository from '@modules/orders/repositories/IOrderUploadRepository';

@injectable()
export default class GetUploadOrderService {
  constructor(
    @inject('OrderUploadRepository')
    private orderUploadRepository: IOrderUploadRepository,
  ) {}

  public async execute(order_id: string): Promise<OrderUpload[]> {
    const upload = await this.orderUploadRepository.findOrderUploadById(
      order_id,
    );

    return upload;
  }
}
