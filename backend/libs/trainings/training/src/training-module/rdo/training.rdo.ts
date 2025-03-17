import {
  Training,
  TrainingDuration,
  TrainingLevel,
  TrainingType,
  UserGender,
} from '@backend/shared/core';
import { Expose } from 'class-transformer';
import { TrainingApiDoc } from '../training.api-doc';

export class TrainingRdo extends TrainingApiDoc implements Training {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  image: string;

  @Expose()
  level: TrainingLevel;

  @Expose()
  type: TrainingType;

  @Expose()
  duration: TrainingDuration;

  @Expose()
  price: number;

  @Expose()
  calories: number;

  @Expose()
  description: string;

  @Expose()
  gender: UserGender;

  @Expose()
  video: string;

  @Expose()
  rating: number;

  @Expose()
  trainer: string;

  @Expose()
  isSpecial: boolean;

  @Expose()
  createdAt: Date;
}
