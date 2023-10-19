import { Entity, PrimaryColumn, Column } from 'typeorm';
import { UserStatus } from '../constants';
import type { UserRole } from './userRoles';

export interface IUser {
  id: string;
  login: string;
  password: string;
  email: string;
  status: UserStatus;
  role: UserRole;
}

@Entity('users')
export class User implements IUser {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { nullable: false, length: 70 })
  login: string;

  @Column('varchar', { nullable: false, length: 255 })
  password: string;

  @Column('varchar', { nullable: false, length: 255 })
  email: string;

  @Column('varchar', { nullable: false, length: 255 })
  status: UserStatus;

  @Column('varchar', { nullable: false, length: 255 })
  role: UserRole;
}
