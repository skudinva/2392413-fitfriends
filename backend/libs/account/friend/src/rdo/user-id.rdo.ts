import { IUserIdRdo } from '@backend/shared/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserIdRdo implements IUserIdRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5',
  })
  @Expose()
  public userId!: string;
}
