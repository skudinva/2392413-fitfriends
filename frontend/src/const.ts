export enum UserGender {
  Man = 'мужской',
  Female = 'женский',
  NotAvailable = 'неважно',
}

export enum TrainingGender {
  Man = 'для мужчин',
  Female = 'для женщин',
  All = 'для всех',
}

export enum TrainingLevel {
  Beginner = 'новичок',
  Amateur = 'любитель',
  Professional = 'профессионал',
}

export const TRAINING_TYPES = [
  'йога',
  'бег',
  'бокс',
  'стрейчинг',
  'кроссфит',
  'аэробика',
  'пилатес',
] as const;

export const LOCATIONS = [
  'Пионерская',
  'Петроградская',
  'Удельная',
  'Звёздная',
  'Спортивная',
] as const;

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
  Login = '/login',
  Register = '/register',
  Favorites = '/favorites',
  Property = '/offer',
  Add = '/add',
  Edit = '/edit',
  NotFound = '/404',
}

export enum ApiRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Register = '/register',
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
  User = 'user',
  Trainer = 'trainer',
}
