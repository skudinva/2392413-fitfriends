import { Token } from '../interfaces/token.interface';
import { IUserRdo } from './user-rdo.interface';

export interface ILoggedUserRdo
  extends Pick<IUserRdo, 'id' | 'email' | 'role'>,
    Token {}
