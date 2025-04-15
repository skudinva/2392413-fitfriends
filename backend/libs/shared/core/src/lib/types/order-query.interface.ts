import { SortDirection } from '../interfaces/sort-direction.interface';
import { SortType } from '../interfaces/sort-type.interface';

export interface ITrainingOrderQuery {
  limit?: number;
  sortDirection?: SortDirection;
  sortBy?: SortType;
  page?: number;
  activeOnly?: boolean;
  trainingId?: number;
}
