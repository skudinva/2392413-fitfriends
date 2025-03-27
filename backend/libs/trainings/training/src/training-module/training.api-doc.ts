import {
  Training,
  TRAINING_DURATIONS,
  TrainingDuration,
  TrainingLevel,
  TrainingType,
  UserGender,
} from '@backend/shared/core';
import { UserRdo } from '@backend/shop-user';
import { ApiProperty } from '@nestjs/swagger';

export class TrainingApiDoc implements Training {
  @ApiProperty({
    description: 'Training id',
    example: '1',
    required: true,
  })
  id: number;

  @ApiProperty({
    description: 'Training title',
    example: 'Boxing',
    required: true,
  })
  title: string;

  @ApiProperty({
    description: 'Training image',
    example: 'image01.png',
    required: true,
  })
  image: string;

  @ApiProperty({
    description: 'Training level',
    required: true,
    enum: TrainingLevel,
    enumName: 'TrainingLevel',
  })
  level: TrainingLevel;

  @ApiProperty({
    description: 'Training type',
    required: true,
    enum: TrainingType,
    enumName: 'TrainingType',
  })
  type: TrainingType;

  @ApiProperty({
    description: 'Training duration',
    required: true,
    enum: TRAINING_DURATIONS,
    enumName: 'TRAINING_DURATIONS',
    example: TRAINING_DURATIONS[0],
  })
  duration: TrainingDuration;

  @ApiProperty({
    description: 'Training price',
    example: '500',
    required: true,
    minimum: 0,
  })
  price: number;

  @ApiProperty({
    description: 'Training calories',
    example: '1000',
    required: true,
  })
  calories: number;

  @ApiProperty({
    description: 'Training description',
    example:
      'Тренировка на фитболе — отличном тренажере для развития чувства баланса и равновесия, улучшения координации.',
    required: true,
  })
  description: string;

  @ApiProperty({
    description: 'gender',
    required: true,
    enum: UserGender,
    enumName: 'UserGender',
    type: UserGender,
  })
  gender: UserGender;

  @ApiProperty({
    description: 'Training video',
    required: true,
    type: 'string',
    format: 'binary',
  })
  video: string;

  @ApiProperty({
    description: 'Training rating',
    required: false,
    default: 0,
  })
  rating: number;

  @ApiProperty({
    description: 'userId',
    required: true,
    example: '63f4567890abcdef1234567d',
  })
  userId: string;

  @ApiProperty({
    description: 'Flag special training',
    required: true,
  })
  isSpecial: boolean;

  @ApiProperty({
    description: 'Creation date',
    required: true,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'User info',
    required: false,
  })
  userInfo: UserRdo;
}
