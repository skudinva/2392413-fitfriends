import { PaginationResult } from '../interfaces/pagination.interface';
import { Comment } from './comment.interface';
import { IUserRdo } from './user-rdo.interface';

export type TrainingCommentWithPagination = PaginationResult<
  Comment & { userInfo: IUserRdo }
>;
