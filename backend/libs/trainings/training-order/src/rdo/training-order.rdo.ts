import { Order, OrderType, PayType } from '@backend/shared/core';
import { Expose } from 'class-transformer';
import { TrainingOrderApiDoc } from '../training-order.api-doc';

export class TrainingOrderRdo extends TrainingOrderApiDoc implements Order {
  @Expose()
  public id: number;

  @Expose()
  type: OrderType;

  @Expose()
  trainingId: number;

  @Expose()
  userId: string;

  @Expose()
  price: number;

  @Expose()
  amount: number;

  @Expose()
  totalPrice: number;

  @Expose()
  paymentType: PayType;

  @Expose()
  createdAt: Date;
}
