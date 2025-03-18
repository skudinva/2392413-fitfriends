import {
  EntityConstrain,
  LocationName,
  LOCATIONS,
  UserGender,
} from '@backend/shared/core';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsIn,
  IsISO8601,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { AuthenticationValidateMessage } from '../authentication-module/authentication.constant';
import { LoginUserDto } from './login-user.dto';

export class CreateUserDto extends LoginUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'Keks',
  })
  @IsString()
  @Length(
    EntityConstrain.user.name.minLength,
    EntityConstrain.user.name.maxLength,
    {
      message: AuthenticationValidateMessage.NameNotValid,
    }
  )
  name: string;

  @ApiProperty({
    description: 'User avatar',

    type: 'string',
    format: 'binary',
    required: true,
  })
  avatar: string;

  @ApiProperty({
    description: 'User gender',
    enum: UserGender,
    type: UserGender,
  })
  @IsEnum(UserGender)
  gender: UserGender;

  @ApiProperty({
    description: 'User description',
    example: '',
    required: false,
  })
  @IsString()
  @Length(
    EntityConstrain.user.description.minLength,
    EntityConstrain.user.description.maxLength
  )
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'User Location',
    example: LOCATIONS[0],
    enum: LOCATIONS,
    enumName: 'LOCATIONS',
  })
  @IsIn(LOCATIONS)
  location: LocationName;

  @ApiProperty({
    description: 'User background image path',
    example: '/images/bgImage.png',
    required: false,
  })
  @IsOptional()
  @IsString()
  backgroundImage?: string;

  @IsISO8601()
  @IsOptional()
  @ApiProperty({
    description: 'User birthday',
    example: '1981-10-11',
    required: false,
  })
  birthday?: Date;
}
