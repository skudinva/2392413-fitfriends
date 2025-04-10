import { Order, OrderType, PayType } from '@backend/shared/core';
import { OmitType } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { TrainingOrderApiDoc } from '../training-order.api-doc';
import { TrainingOrderValidateMessage } from '../training-order.constant';

export class BaseOrderDto
  extends OmitType(TrainingOrderApiDoc, ['createdAt'])
  implements Omit<Order, 'createdAt'>
{
  @IsNumber()
  public id: number;

  @IsString()
  @IsMongoId({ message: TrainingOrderValidateMessage.InvalidID })
  public userId!: string;

  @IsNumber()
  public trainingId: number;

  @IsEnum(OrderType)
  public type: OrderType;

  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(0)
  public price: number;

  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(1)
  @Max(50)
  public amount: number;

  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(0)
  public totalPrice: number;

  @IsEnum(PayType)
  public paymentType: PayType;
}
