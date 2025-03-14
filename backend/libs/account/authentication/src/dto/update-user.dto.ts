import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email', 'password', 'avatar'] as const)
) {
  @ApiProperty({
    description: 'User avatar',

    type: 'string',
    format: 'binary',
    required: true,
  })
  public avatar?: string;
}
