import { IUserIdRdo } from '@backend/shared/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserIdRdo implements IUserIdRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '677cd8d75ff92067f1de5911',
  })
  @Expose()
  public userId!: string;
}
