import { AuthorizationStatus } from '../const';
import store from '../store';
import {
  TokenPayload,
  TrainingCommentWithPagination,
  TrainingWithPagination,
  TrainingWithUserInfo,
  UserRdo,
} from './shared';

export type SiteData = {
  specialTraining: TrainingWithPagination | null;
  isSpecialTrainingLoading: boolean;
  training: TrainingWithPagination | null;
  isTrainingLoading: boolean;
  trainingCard: TrainingWithUserInfo | null;
  isTrainingCardLoading: boolean;
  trainingComment: TrainingCommentWithPagination | null;
  isTrainingCommentLoading: boolean;
  isSuccessAddTrainingComment: boolean;
  popularTraining: TrainingWithPagination | null;
  isPopularTrainingLoading: boolean;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: TokenPayload;
  isUserInfoLoading: boolean;
  userInfo: UserRdo | null;
  isUserInfoSave: boolean;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
