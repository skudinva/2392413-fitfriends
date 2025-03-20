import { PaginationResult } from '../interfaces/pagination.interface';
import { TrainingCommentWithUserInfo } from './comment-with-user-info.interface';

export type TrainingCommentWithPagination =
  PaginationResult<TrainingCommentWithUserInfo>;
