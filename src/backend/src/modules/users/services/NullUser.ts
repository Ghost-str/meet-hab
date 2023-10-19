import { UserStatus } from '../constants';
import { IUser } from '../entities/user.entity';
import type { UserRole } from '../entities/userRoles';

export class NullUser implements IUser {
  email: string;
  status: UserStatus;
  role: UserRole;
  id: string;
  login: string;
  password: string;
}
