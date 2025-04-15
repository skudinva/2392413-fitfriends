import { OrderType, OrderWithTraining, PayType } from '@backend/shared/core';
import { TrainingRdo } from '@backend/training';
import { Expose } from 'class-transformer';
import { TrainingOrderApiDoc } from '../training-order.api-doc';

export class TrainingOrderRdo
  extends TrainingOrderApiDoc
  implements OrderWithTraining
{
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
  isStarted: boolean;

  @Expose()
  doneCount: number;

  @Expose()
  isDone: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  training: TrainingRdo;
}
