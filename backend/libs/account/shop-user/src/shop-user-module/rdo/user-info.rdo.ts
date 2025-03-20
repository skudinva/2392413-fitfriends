import { PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserRdo } from './user.rdo';

export class UserInfoRdo extends PickType(UserRdo, ['id', 'email', 'name']) {
  @Expose()
  public id!: string;

  @Expose()
  public email!: string;

  @Expose()
  public name!: string;
}
