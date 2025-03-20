import {
  EntityConstrain,
  Training,
  TRAINING_DURATIONS,
  TrainingDuration,
  TrainingLevel,
  TrainingType,
  UserGender,
} from '@backend/shared/core';
import { OmitType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsIn,
  IsMongoId,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { TrainingApiDoc } from '../training.api-doc';

export class BaseTrainingDto
  extends OmitType(TrainingApiDoc, ['createdAt', 'rating', 'userInfo'])
  implements Omit<Training, 'createdAt' | 'rating'>
{
  @IsNumber()
  id: number;

  @IsString()
  @Length(
    EntityConstrain.training.title.minLength,
    EntityConstrain.training.title.maxLength
  )
  title: string;

  @IsString()
  image: string;

  @IsEnum(TrainingLevel)
  level: TrainingLevel;

  @IsEnum(TrainingType)
  type: TrainingType;

  @IsIn(TRAINING_DURATIONS)
  duration: TrainingDuration;

  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(0)
  price: number;

  @IsNumber()
  @Min(EntityConstrain.training.calories.minValue)
  @Max(EntityConstrain.training.calories.maxValue)
  calories: number;

  @IsString()
  @Length(
    EntityConstrain.training.description.minLength,
    EntityConstrain.training.description.maxLength
  )
  description: string;

  @IsEnum(UserGender)
  gender: UserGender;

  @IsString()
  video: string;

  @IsString()
  @IsMongoId()
  userId: string;

  @IsBoolean()
  isSpecial: boolean;
}
