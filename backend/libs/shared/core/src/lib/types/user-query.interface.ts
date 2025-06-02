import { SortDirection } from '../interfaces/sort-direction.interface';
import { SortType } from '../interfaces/sort-type.interface';
import { LocationName } from './location-name.interface';
import { TrainingLevel } from './training-level.enum';
import { TrainingType } from './training-type.enum';
import { UserRole } from './user-role.enum';

export interface IUserQuery {
  types?: TrainingType[];
  locations?: LocationName[];
  trainingLevel?: TrainingLevel;
  role?: UserRole;
  readyForTraining?: boolean;
  limit?: number;
  sortDirection?: SortDirection;
  sortBy?: SortType;
  page?: number;
  userId?: string;
}
