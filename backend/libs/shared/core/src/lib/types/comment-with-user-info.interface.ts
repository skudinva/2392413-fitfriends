import { Comment } from './comment.interface';
import { IUserRdo } from './user-rdo.interface';

export type TrainingCommentWithUserInfo = Comment & { userInfo: IUserRdo };
