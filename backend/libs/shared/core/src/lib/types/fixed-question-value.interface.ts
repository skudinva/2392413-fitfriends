import { TrainingLevel } from './training-level.enum';
import { TrainingType } from './training-type.enum';

export interface FixedQuestionValue {
  calories: number;
  trainingLevel: TrainingLevel;
  trainingType: TrainingType[];
}
