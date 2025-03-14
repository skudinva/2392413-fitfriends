import { User } from './user.interface';

export type IUpdateUserDto = Omit<
  Partial<User>,
  'id' | 'email' | 'password' | 'registerDate'
>;
