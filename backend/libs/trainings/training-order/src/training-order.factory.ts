import { EntityFactory, Order } from '@backend/shared/core';
import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { CreateOrderDto } from './dto/create-order.dto';
import { TrainingOrderEntity } from './training-order.entity';

@Injectable()
export class TrainingOrderFactory
  implements EntityFactory<TrainingOrderEntity>
{
  public create(entityPlainData: Order): TrainingOrderEntity {
    return new TrainingOrderEntity(entityPlainData);
  }

  public static composeFromCreateOrderDto(
    dto: CreateOrderDto
  ): TrainingOrderEntity {
    const newOrder = new TrainingOrderEntity();

    newOrder.id = undefined;
    newOrder.type = dto.type;
    newOrder.trainingId = dto.trainingId;
    newOrder.userId = dto.userId;
    newOrder.price = dto.price;
    newOrder.amount = dto.amount;
    newOrder.totalPrice = dto.totalPrice;
    newOrder.paymentType = dto.paymentType;
    newOrder.createdAt = dayjs().toDate();

    return newOrder;
  }
}
