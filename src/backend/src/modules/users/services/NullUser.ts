import { UserStatus } from '../constants';
import { IUser } from '../entities/user.entity';

export class NullUser implements IUser {
  email: string;
  status: UserStatus;
  role: string;
  id: string;
  login: string;
  password: string;
}
