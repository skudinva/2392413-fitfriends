import { SortDirection } from '../interfaces/sort-direction.interface';
import { SortType } from '../interfaces/sort-type.interface';
import { UserRole } from './user-role.enum';

export interface ITrainingOrderQuery {
  limit?: number;
  sortDirection?: SortDirection;
  sortBy?: SortType;
  page?: number;
  activeOnly?: boolean;
  trainingId?: number;
  userId: string;
  role?: UserRole;
}
