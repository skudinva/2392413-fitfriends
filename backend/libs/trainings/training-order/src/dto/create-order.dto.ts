import { ICreateOrderDto } from '@backend/shared/core';
import { OmitType } from '@nestjs/swagger';
import { BaseOrderDto } from './base-order.dto';

export class CreateOrderDto
  extends OmitType(BaseOrderDto, ['id'])
  implements ICreateOrderDto {}
