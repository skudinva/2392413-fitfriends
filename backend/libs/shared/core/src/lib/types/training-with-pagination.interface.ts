import { PaginationResult } from '../interfaces/pagination.interface';
import { TrainingWithUserInfo } from './training-with-user-info.interface';

export type TrainingWithPagination = PaginationResult<TrainingWithUserInfo> & {
  maxPrice: number;
};
