import { EntityConstrain, ILoginUserDto } from '@backend/shared/core';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { AuthenticationValidateMessage } from '../authentication-module/authentication.constant';

export class LoginUserDto implements ILoginUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'johndoe123@gmail.com',
  })
  @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
  public email!: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsString()
  @Length(
    EntityConstrain.user.password.minLength,
    EntityConstrain.user.password.maxLength,
    {
      message: AuthenticationValidateMessage.PasswordNotValid,
    }
  )
  public password!: string;
}
