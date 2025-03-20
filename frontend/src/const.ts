import { TrainingType } from './types/shared';

export const PROJECT_NAME = 'FitFriends';

export const TRAINING_TYPE = Object.values(TrainingType);

export enum TrainingGender {
  Man = 'для мужчин',
  Female = 'для женщин',
  All = 'для всех',
}

export const ORDER_TYPES = ['абонемент'] as const;

export const PAY_TYPES = ['visa', 'mir', 'umoney'] as const;

export enum AppRoute {
  Root = '/',
  Intro = '/intro',
  Login = '/login',
  Register = '/register',
  PersonalAccount = '/personalAccount',
  Trainings = '/trainings',
  Friends = '/friends',
  Purchases = '/purchases',
  Favorites = '/favorites',
  Property = '/offer',
  Add = '/add',
  Edit = '/edit',
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
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum Sorting {
  Popular = 'Popular',
  PriceIncrease = 'Price: low to high',
  PriceDecrease = 'Price: high to low',
  TopRated = 'Top rated first',
}

export enum StoreSlice {
  SiteData = 'SITE_DATA',
  SiteProcess = 'SITE_PROCESS',
  UserProcess = 'USER_PROCESS',
}
