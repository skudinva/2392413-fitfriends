import { Order, OrderType, PayType } from '@backend/shared/core';
import { TrainingRdo } from '@backend/training';
import { ApiProperty } from '@nestjs/swagger';

export class TrainingOrderApiDoc implements Order {
  @ApiProperty({
    description: 'ID order',
    example: '1',
  })
  id!: number;

  @ApiProperty({
    description: 'type',
    example: OrderType.Ticket,
    enum: OrderType,
    enumName: 'OrderType',
    required: true,
  })
  type!: OrderType;

  @ApiProperty({
    description: 'Training id',
    example: '1',
    required: true,
  })
  trainingId!: number;

  @ApiProperty({
    description: 'userId',
    required: true,
    example: '63f4567890abcdef1234567d',
  })
  userId!: string;

  @ApiProperty({
    description: 'Training price',
    example: '500',
    required: true,
    minimum: 0,
  })
  price!: number;

  @ApiProperty({
    description: 'Training amount',
    example: '1',
    required: true,
    minimum: 1,
    maximum: 50,
  })
  amount!: number;

  @ApiProperty({
    description: 'Training totalPrice',
    example: '500',
    required: true,
    minimum: 0,
  })
  totalPrice!: number;

  @ApiProperty({
    description: 'paymentType',
    example: PayType.Mir,
    enum: PayType,
    enumName: 'PayType',
    required: true,
  })
  paymentType!: PayType;

  @ApiProperty({
    description: 'Date of order',
    example: '2024-02-15T13:43:22+07:00',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'Training info',
    required: false,
  })
  training: TrainingRdo;
}
