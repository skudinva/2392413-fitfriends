import { FriendWithPagination } from '@backend/shared/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { UserIdRdo } from './user-id.rdo';

export class FriendWithPaginationRdo implements FriendWithPagination {
  @Expose()
  @Type(() => UserIdRdo)
  @ValidateNested({ always: true })
  @ApiProperty({
    description: 'users',
    type: UserIdRdo,
  })
  public entities!: UserIdRdo[];

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
}
