import { TransformToArray } from '@backend/helpers';
import {
  IUserQuery,
  LocationName,
  LOCATIONS,
  SortDirection,
  SortType,
  TrainingLevel,
  TrainingType,
  UserRole,
} from '@backend/shared/core';
import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsEnum, IsIn, IsNumber, IsOptional } from 'class-validator';
import {
  DEFAULT_PAGE,
  DEFAULT_SORT_DIRECTION,
  DEFAULT_SORT_TYPE,
  DEFAULT_USER_COUNT_LIMIT,
} from './shop-user.constant';

@Injectable()
export class ShopUserQuery implements IUserQuery {
  @ApiProperty({
    description: 'Training type',
    enum: TrainingType,
    enumName: 'TrainingType',
    required: true,
    isArray: true,
  })
  @IsIn(Object.values(TrainingType), { each: true })
  @IsArray()
  @TransformToArray()
  types: TrainingType[];

  @ApiProperty({
    description: 'Locations',
    enum: LOCATIONS,
    enumName: 'LocationName',
    required: true,
    isArray: true,
  })
  @IsIn(Object.values(LOCATIONS), { each: true })
  //@IsOptional()
  @IsArray()
  @TransformToArray()
  locations: LocationName[];

  @ApiProperty({
    description: 'Training level',
    required: true,
    enum: TrainingLevel,
    enumName: 'TrainingLevel',
  })
  @IsEnum(TrainingLevel)
  trainingLevel: TrainingLevel;

  @ApiProperty({
    description: 'User role',
    required: false,
    enum: UserRole,
    enumName: 'UserRole',
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @Transform(({ value }) => parseInt(value, 10) || DEFAULT_USER_COUNT_LIMIT)
  @IsOptional()
  @ApiProperty({
    description: 'limit',
    example: DEFAULT_USER_COUNT_LIMIT,
  })
  limit?: number = DEFAULT_USER_COUNT_LIMIT;

  @Transform(({ value }) => value || DEFAULT_SORT_DIRECTION)
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  @ApiProperty({
    description: 'sortDirection',
    enum: SortDirection,
    enumName: 'SortDirection',
    default: DEFAULT_SORT_DIRECTION,
  })
  sortDirection?: SortDirection = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => value || DEFAULT_SORT_TYPE)
  @IsIn(Object.values(SortType))
  @IsOptional()
  @ApiProperty({
    description: 'sortBy',
    enum: SortType,
    enumName: 'SortType',
    default: DEFAULT_SORT_TYPE,
  })
  sortBy?: SortType = DEFAULT_SORT_TYPE;

  @Transform(({ value }) => parseInt(value, 10) || DEFAULT_PAGE)
  @IsOptional()
  @ApiProperty({
    description: 'page',
    example: DEFAULT_PAGE,
    default: DEFAULT_PAGE,
  })
  @IsNumber({ maxDecimalPlaces: 0 })
  page?: number = DEFAULT_PAGE;

  userId?: string;
}
