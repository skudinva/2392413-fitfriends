import { TransformToArray } from '@backend/helpers';
import {
  EntityConstrain,
  ITrainingQuery,
  SortDirection,
  SortType,
  TRAINING_DURATIONS,
  TrainingDuration,
  TrainingType,
} from '@backend/shared/core';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
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
    enum: TrainingType,
    enumName: 'TrainingType',
    required: false,
    isArray: true,
  })
  @IsIn(Object.values(TrainingType), { each: true })
  @IsOptional()
  @IsArray()
  @TransformToArray()
  public types: TrainingType[];

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
  @IsNumber({ maxDecimalPlaces: 0 })
  public page: number = DEFAULT_PAGE;

  @Transform(({ value }) => parseInt(value, 10) || 0)
  @ApiProperty({
    description: 'minPrice',
    required: true,
    example: 100,
    default: 0,
  })
  @Max(Number.MAX_SAFE_INTEGER)
  @Min(0)
  @IsNumber({ maxDecimalPlaces: 0 })
  @IsOptional()
  minPrice: number;

  @Transform(({ value }) => parseInt(value, 10) || 0)
  @ApiProperty({
    description: 'maxPrice',
    required: true,
    example: 10000,
    default: 10000,
  })
  @Min(0)
  @IsOptional()
  @IsInt()
  maxPrice: number;

  @Transform(({ value }) => parseInt(value, 10) || 0)
  @ApiProperty({
    description: 'minCalories',
    required: true,
    example: EntityConstrain.training.calories.minValue,
    default: EntityConstrain.training.calories.minValue,
  })
  @Min(EntityConstrain.training.calories.minValue)
  @Max(EntityConstrain.training.calories.maxValue)
  @IsNumber({ maxDecimalPlaces: 0 })
  @IsOptional()
  minCalories: number;

  @Transform(({ value }) => parseInt(value, 10) || 0)
  @ApiProperty({
    description: 'maxCalories',
    required: true,
    example: EntityConstrain.training.calories.maxValue,
    default: EntityConstrain.training.calories.maxValue,
  })
  @Min(EntityConstrain.training.calories.minValue)
  @Max(EntityConstrain.training.calories.maxValue)
  @IsNumber({ maxDecimalPlaces: 0 })
  @IsOptional()
  maxCalories: number;

  @Transform(({ value }) => parseInt(value, 10) || 0)
  @ApiProperty({
    description: 'minRating',
    required: true,
    example: 0,
    default: 0,
  })
  @Min(0)
  @Max(EntityConstrain.feedback.mark.maxValue)
  @IsNumber({ maxDecimalPlaces: 0 })
  @IsOptional()
  minRating: number;

  @Transform(({ value }) => parseInt(value, 10) || 0)
  @ApiProperty({
    description: 'maxRating',
    required: true,
    example: 5,
    default: 5,
  })
  @Min(EntityConstrain.feedback.mark.minValue)
  @Max(EntityConstrain.feedback.mark.maxValue)
  @IsNumber({ maxDecimalPlaces: 0 })
  @IsOptional()
  maxRating: number;

  @ApiProperty({
    description: 'Flag special training',
    required: false,
  })
  @Transform(({ value }) => String(value).toLowerCase() === 'true')
  @IsOptional()
  isSpecial?: boolean;

  @ApiProperty({
    description: 'Training durations',
    enum: TRAINING_DURATIONS,
    enumName: 'TRAINING_DURATIONS',
    required: false,
    isArray: true,
  })
  @IsIn(Object.values(TRAINING_DURATIONS), { each: true })
  @IsOptional()
  @IsArray()
  @TransformToArray()
  durations: TrainingDuration[];

  userId?: string;
}
