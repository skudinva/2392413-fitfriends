import { ApiProperty, OmitType } from '@nestjs/swagger';
import 'multer';
import { CreateUserDto } from './create-user.dto';

export class RegisterUserDto extends OmitType(CreateUserDto, ['avatar']) {
  @ApiProperty({
    description: 'User avatar',

    type: 'string',
    format: 'binary',
    required: true,
  })
  public avatar?: Express.Multer.File;
}
