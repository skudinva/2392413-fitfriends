export enum TrainingGender {
  Man = 'для мужчин',
  Female = 'для женщин',
  All = 'для всех',
}

export const TRAINING_DURATIONS = [
  '10-30 мин',
  '30-50 мин',
  '50-80 мин',
  '80-100 мин',
] as const;

export const ORDER_TYPES = ['абонемент'] as const;

export const PAY_TYPES = ['visa', 'mir', 'umoney'] as const;

export enum AppRoute {
  Root = '/',
  Intro = '/intro',
  Login = '/login',
  Register = '/register',
  PersonalAccount = 'personalAccount',
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
  Users = '/api/users',

  Offers = '/offers',
  Avatar = '/avatar',
  Comments = '/comments',
  Favorite = '/favorites',
  Premium = '/premium',
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

export enum UserRole {
  Sportsman = 'sportsman',
  Coach = 'coach',
}

export enum StoreSlice {
  SiteData = 'SITE_DATA',
  SiteProcess = 'SITE_PROCESS',
  UserProcess = 'USER_PROCESS',
}
