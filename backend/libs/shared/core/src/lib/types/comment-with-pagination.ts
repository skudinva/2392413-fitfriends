import { PaginationResult } from '../interfaces/pagination.interface';
import { Comment } from './comment.interface';

export type TrainingCommentWithPagination = PaginationResult<Comment>;
