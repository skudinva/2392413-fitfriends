import { SortDirection } from '@backend/shared/core';
import { Transform } from 'class-transformer';
import { IsIn, IsOptional } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import {
  DEFAULT_PAGE,
  DEFAULT_SORT_DIRECTION,
  MAX_COMMENTS_COUNT,
} from './training-comment.constant';

export class TrainingCommentQuery {
  public limit: number = MAX_COMMENTS_COUNT;

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
}
