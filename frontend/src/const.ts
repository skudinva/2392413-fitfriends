import { TrainingLevel, TrainingType } from './types/shared';

export const PROJECT_NAME = 'FitFriends';

export const TRAINING_TYPE = Object.values(TrainingType);

export const TRAINING_LEVEL = Object.values(TrainingLevel);

export enum AppRoute {
  Root = '/',
  Intro = '/intro',
  Login = '/login',
  Register = '/register',
  PersonalAccount = '/personalAccount',
  Trainings = '/trainings',
  CreateTraining = '/createTraining',
  Friends = '/friends',
  Purchases = '/purchases',
  NotFound = '/404',
}

export enum ApiRoute {
  CheckLogin = '/api/users/check',
  Register = '/api/users/register',
  Login = '/api/users/login',
  Logout = '/api/users/logout',
  UserUpdate = '/api/users/update',
  Users = '/api/users',
  Trainings = '/api/trainings',
  Comments = '/api/trainings/comments',
  Order = '/api/orders',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum StoreSlice {
  SiteData = 'SITE_DATA',
  UserProcess = 'USER_PROCESS',
}

export const SPECIAL_FOR_YOU_CARD_LIMIT = 9;
export const DISCOUNT_TRAINING_LIMIT = 3;
