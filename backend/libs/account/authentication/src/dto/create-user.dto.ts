import { EntityConstrain, Location, UserGender } from '@backend/shared/core';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
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
  public name: string;

  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png',
  })
  @IsString()
  public avatar: string;

  @ApiProperty({
    description: 'User gender',
    enum: UserGender,
  })
  @IsEnum(UserGender)
  gender: UserGender;

  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png',
  })
  @IsString()
  @IsOptional()
  @Length(
    EntityConstrain.user.description.minLength,
    EntityConstrain.user.description.maxLength
  )
  description?: string;

  @ApiProperty({
    description: 'User Location',
    enum: Location,
  })
  @IsEnum(Location)
  location: Location;

  @ApiProperty({
    description: 'User background image path',
    example: '/images/bgImage.png',
  })
  @IsString()
  backgroundImage: string;

  @IsISO8601()
  @IsOptional()
  @ApiProperty({ description: 'User birthday' })
  birthDate?: Date;
}
