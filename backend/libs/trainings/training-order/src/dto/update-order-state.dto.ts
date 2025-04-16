import { IUpdateOrderStateDto } from '@backend/shared/core';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
import { BaseOrderDto } from './base-order.dto';

export class UpdateOrderStateDto
  extends PickType(BaseOrderDto, ['trainingId', 'userId'])
  implements IUpdateOrderStateDto
{
  @ApiProperty({
    description: 'state',
    example: 'start',
    required: true,
    type: String,
  })
  @IsIn(['start', 'finish'])
  state: 'start' | 'finish';
}
