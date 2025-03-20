import { Training } from './training.interface';
import { IUserRdo } from './user-rdo.interface';

export type TrainingWithUserInfo = Training & { userInfo: IUserRdo };
