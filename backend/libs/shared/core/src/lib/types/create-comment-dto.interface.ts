import { Comment } from './comment.interface';

export type ICreateCommentDto = Omit<Comment, 'id' | 'createdAt'>;
