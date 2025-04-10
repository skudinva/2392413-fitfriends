import { TrainingOrderWithPagination } from '@backend/shared/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { TrainingOrderRdo } from './training-order.rdo';

export class TrainingOrderWithPaginationRdo
  implements TrainingOrderWithPagination
{
  @ApiProperty({
    description: 'orders',
    type: TrainingOrderRdo,
  })
  @Expose()
  @Type(() => TrainingOrderRdo)
  public entities: TrainingOrderRdo[];

  @ApiProperty({
    description: 'Total page count of selected entity',
    example: 10,
  })
  @Expose()
  public totalPages: number;

  @ApiProperty({
    description: 'Current page number',
    example: 2,
  })
  @Expose()
  public currentPage: number;

  @ApiProperty({
    description: 'Total items count of selected entity',
    example: 50,
  })
  @Expose()
  public totalItems: number;

  @ApiProperty({
    description: 'Number of items on one page',
    example: 20,
  })
  @Expose()
  public itemsPerPage: number;
}
