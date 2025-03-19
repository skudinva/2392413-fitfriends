import { AuthorizationStatus } from '../const';
import store from '../store';
import {
  TokenPayload,
  Training,
  TrainingWithPagination,
  UserRdo,
} from './shared';
import type { SortName } from './types';

export type SiteData = {
  training: TrainingWithPagination | null;
  isTrainingLoading: boolean;
  trainingCard: Training | null;
  isTrainingCardLoading: boolean;

  //isOfferLoading: boolean;
  //favoriteOffers: Offer[];
  //isFavoriteOffersLoading: boolean;
  //premiumOffers: Offer[];
  //comments: Comment[];
  //commentStatus: SubmitStatus;
};

export type SiteProcess = {
  // city: City;
  sorting: SortName;
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
