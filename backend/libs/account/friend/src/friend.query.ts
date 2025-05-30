import { IFriendQuery, SortDirection, SortType } from '@backend/shared/core';
import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional } from 'class-validator';
import {
  DEFAULT_FRIEND_COUNT_LIMIT,
  DEFAULT_PAGE,
  DEFAULT_SORT_DIRECTION,
  DEFAULT_SORT_TYPE,
} from './friend.constant';

@Injectable()
export class FriendQuery implements IFriendQuery {
  @Transform(({ value }) => parseInt(value, 10) || DEFAULT_FRIEND_COUNT_LIMIT)
  @IsOptional()
  @ApiProperty({
    description: 'limit',
    example: DEFAULT_FRIEND_COUNT_LIMIT,
  })
  limit?: number = DEFAULT_FRIEND_COUNT_LIMIT;

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

  @ApiProperty({
    description: 'userId',
    required: false,
  })
  userId!: string;
}
