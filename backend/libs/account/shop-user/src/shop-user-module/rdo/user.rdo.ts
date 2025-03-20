import {
  IUserRdo,
  LocationName,
  LOCATIONS,
  TrainingLevel,
  UserGender,
  UserRole,
} from '@backend/shared/core';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserRdo implements IUserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5',
  })
  @Expose()
  public id!: string;

  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png',
  })
  @Expose()
  public avatar!: string;

  @ApiProperty({
    description: 'User register date (ISO format)',
    example: '1981-03-12',
  })
  @Expose()
  public registerDate!: Date;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.local',
  })
  @Expose()
  public email!: string;

  @ApiProperty({
    description: 'User name',
    example: 'Keks',
  })
  @Expose()
  public name!: string;

  @ApiProperty({
    description: 'User gender',
    enum: UserGender,
    type: UserGender,
  })
  @Expose()
  gender: UserGender;

  @ApiProperty({ description: 'User birthday', example: '1981-10-11' })
  @Expose()
  birthday?: Date;

  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png',
  })
  @Expose()
  description?: string;

  @ApiProperty({
    description: 'User Location',
    example: LOCATIONS[0],
    type: String,
  })
  @Expose()
  location: LocationName;

  @ApiProperty({
    description: 'User background image path',
    example: '/images/bgImage.png',
  })
  @Expose()
  backgroundImage?: string;

  @ApiProperty({
    description: 'User calories',
    example: 2300,
  })
  @Expose()
  calories: number;

  @ApiProperty({
    description: 'User trainingLevel',
    example: TrainingLevel.Beginner,
    enum: TrainingLevel,
    enumName: 'TrainingLevel',
  })
  @Expose()
  trainingLevel: TrainingLevel;

  @ApiProperty({
    description: 'User role',
    example: UserRole.Sportsman,
    enum: UserRole,
    enumName: 'UserRole',
  })
  @Expose()
  role: UserRole;
}
