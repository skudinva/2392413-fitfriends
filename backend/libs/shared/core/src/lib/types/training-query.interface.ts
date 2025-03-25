import { SortDirection } from '../interfaces/sort-direction.interface';
import { SortType } from '../interfaces/sort-type.interface';

export interface ITrainingQuery {
  limit?: number;
  sortDirection?: SortDirection;
  sortBy?: SortType;
  page?: number;
  minPrice: number;
  maxPrice: number;
  minCalories: number;
  maxCalories: number;
  minRating: number;
  maxRating: number;
}
