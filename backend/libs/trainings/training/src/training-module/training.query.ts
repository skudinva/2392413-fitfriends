import { ITrainingQuery, SortDirection, SortType } from '@backend/shared/core';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsIn, IsOptional } from 'class-validator';
import {
  DEFAULT_PAGE,
  DEFAULT_SORT_DIRECTION,
  DEFAULT_SORT_TYPE,
  DEFAULT_TRAINING_COUNT_LIMIT,
} from './training.constant';

export class TrainingQuery implements ITrainingQuery {
  @Transform(({ value }) => parseInt(value, 10) || DEFAULT_TRAINING_COUNT_LIMIT)
  @IsOptional()
  @ApiProperty({
    description: 'limit',
    example: DEFAULT_TRAINING_COUNT_LIMIT,
  })
  public limit: number = DEFAULT_TRAINING_COUNT_LIMIT;

  @Transform(({ value }) => value || DEFAULT_SORT_DIRECTION)
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  @ApiProperty({
    description: 'sortDirection',
    enum: SortDirection,
    enumName: 'SortDirection',
    default: DEFAULT_SORT_DIRECTION,
  })
  public sortDirection: SortDirection = DEFAULT_SORT_DIRECTION;

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

  @Transform(({ value }) => parseInt(value, 10) || DEFAULT_PAGE)
  @IsOptional()
  @ApiProperty({
    description: 'page',
    example: DEFAULT_PAGE,
    default: DEFAULT_PAGE,
  })
  public page: number = DEFAULT_PAGE;
}
