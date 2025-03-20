import { LocationName } from './location-name.interface';
import { UserGender } from './user-gender.enum';
import { UserRole } from './user-role.enum';

export interface User {
  id?: string;
  email: string;
  name: string;
  avatar?: string;
  gender: UserGender;
  birthday?: Date;
  description?: string;
  location: LocationName;
  backgroundImage?: string;
  registerDate: Date;
  role: UserRole;
}
