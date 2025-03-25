import { TransformToArray } from '@backend/helpers';
import {
  ITrainingQuery,
  SortDirection,
  SortType,
  TrainingType,
} from '@backend/shared/core';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsIn, IsOptional } from 'class-validator';
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

  @ApiProperty({
    description: 'Training type',
    example: TrainingType.Boxing,
    enum: TrainingType,
    enumName: 'TrainingType',
    required: false,
    isArray: true,
  })
  @IsIn(Object.values(TrainingType), { each: true })
  @IsOptional()
  @IsArray()
  @TransformToArray()
  public type: TrainingType[];

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

  @Transform(({ value }) => parseInt(value, 10) || 0)
  @ApiProperty({
    description: 'minPrice',
    required: true,
    example: 100,
    default: 0,
  })
  minPrice: number;

  @Transform(({ value }) => parseInt(value, 10) || 0)
  @ApiProperty({
    description: 'maxPrice',
    required: true,
    example: 10000,
    default: 10000,
  })
  maxPrice: number;

  @Transform(({ value }) => parseInt(value, 10) || 0)
  @ApiProperty({
    description: 'minCalories',
    required: true,
    example: 100,
    default: 0,
  })
  minCalories: number;

  @Transform(({ value }) => parseInt(value, 10) || 0)
  @ApiProperty({
    description: 'maxCalories',
    required: true,
    example: 10000,
    default: 10000,
  })
  maxCalories: number;

  @Transform(({ value }) => parseInt(value, 10) || 0)
  @ApiProperty({
    description: 'minRating',
    required: true,
    example: 0,
    default: 0,
  })
  minRating: number;

  @Transform(({ value }) => parseInt(value, 10) || 0)
  @ApiProperty({
    description: 'maxRating',
    required: true,
    example: 5,
    default: 5,
  })
  maxRating: number;
}
