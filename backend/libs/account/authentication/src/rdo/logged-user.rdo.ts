import { ILoggedUserRdo } from '@backend/shared/core';
import { UserRdo } from '@backend/shop-user';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoggedUserRdo
  extends PickType(UserRdo, ['id', 'email'])
  implements ILoggedUserRdo
{
  @ApiProperty({
    description: 'Access token',
    example: 'user@user.local',
  })
  @Expose()
  public accessToken!: string;

  @ApiProperty({
    description: 'Refresh token',
  })
  @Expose()
  public refreshToken!: string;
}
