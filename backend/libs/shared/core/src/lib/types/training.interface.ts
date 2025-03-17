import { TrainingDuration } from './training-duration.interface';
import { TrainingLevel } from './training-level.enum';
import { TrainingType } from './training-type.enum';
import { UserGender } from './user-gender.enum';

export interface Training {
  id: number;
  title: string;
  image: string;
  level: TrainingLevel;
  type: TrainingType;
  duration: TrainingDuration;
  price: number;
  calories: number;
  description: string;
  gender: UserGender;
  video: string;
  rating: number;
  trainer: string;
  isSpecial: boolean;
  createdAt: Date;
}
