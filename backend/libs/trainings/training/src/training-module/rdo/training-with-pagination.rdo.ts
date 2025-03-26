import { TrainingWithPagination } from '@backend/shared/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { TrainingRdo } from './training.rdo';

export class TrainingWithPaginationRdo implements TrainingWithPagination {
  @Expose()
  @Type(() => TrainingRdo)
  @ValidateNested({ always: true })
  @ApiProperty({
    description: 'trainings',
    type: TrainingRdo,
  })
  public entities!: TrainingRdo[];

  @Expose()
  @ApiProperty({
    description: 'totalPages',
    example: 10,
  })
  public totalPages!: number;

  @Expose()
  @ApiProperty({
    description: 'totalItems',
    example: 100,
  })
  public totalItems!: number;

  @Expose()
  @ApiProperty({
    description: 'currentPage',
    example: 1,
  })
  public currentPage!: number;

  @Expose()
  @ApiProperty({
    description: 'itemsPerPage',
    example: 5,
  })
  public itemsPerPage!: number;

  @Expose()
  @ApiProperty({
    description: 'maxPrice',
    example: 1000,
  })
  maxPrice: number;
}
