import { Location } from './location.interface';
import { UserGender } from './user-gender.enum';

export interface User {
  id?: string;
  email: string;
  name: string;
  avatar?: string;
  gender: UserGender;
  birthday?: Date;
  description?: string;
  location: Location;
  backgroundImage: string;
  registerDate: Date;
}
