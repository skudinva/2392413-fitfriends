import {
  ITrainingOrderQuery,
  SortDirection,
  SortType,
  UserRole,
} from '@backend/shared/core';
import { Transform } from 'class-transformer';
import { IsIn, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import {
  DEFAULT_PAGE,
  DEFAULT_SORT_DIRECTION,
  DEFAULT_SORT_TYPE,
  MAX_ORDERS_COUNT,
} from './training-order.constant';

export class TrainingOrderQuery implements ITrainingOrderQuery {
  public limit: number = MAX_ORDERS_COUNT;

  @Transform(({ value }) => value || DEFAULT_SORT_TYPE)
  @IsIn(Object.values(SortType))
  @IsOptional()
  @ApiProperty({
    description: 'sortBy',
    enum: SortType,
    enumName: 'SortType',
    default: DEFAULT_SORT_TYPE,
  })
  public sortBy: SortType = DEFAULT_SORT_TYPE;

  @ApiProperty({
    description: 'sortDirection',
    enum: SortDirection,
    enumName: 'SortDirection',
    default: DEFAULT_SORT_DIRECTION,
  })
  @Transform(({ value }) => value || DEFAULT_SORT_DIRECTION)
  @IsOptional()
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = DEFAULT_SORT_DIRECTION;

  @ApiProperty({
    description: 'page',
    example: DEFAULT_PAGE,
    default: DEFAULT_PAGE,
  })
  @Transform(({ value }) => parseInt(value, 10) || DEFAULT_PAGE)
  @IsOptional()
  public page: number = DEFAULT_PAGE;

  @ApiProperty({
    description: 'Только активные',
    example: false,
    default: false,
    required: false,
  })
  @Transform(({ value }) => String(value).toLowerCase() === 'true')
  @IsOptional()
  public activeOnly: boolean;

  @ApiProperty({
    description: 'trainingId',
    example: 52,
    default: 52,
    required: false,
  })
  @IsOptional()
  public trainingId: number;

  userId: string;
  role: UserRole;
}
