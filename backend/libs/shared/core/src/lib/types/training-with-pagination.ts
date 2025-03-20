import { PaginationResult } from '../interfaces/pagination.interface';
import { Training } from './training.interface';
import { IUserRdo } from './user-rdo.interface';

export type TrainingWithPagination = PaginationResult<
  Training & { userInfo: IUserRdo }
>;
