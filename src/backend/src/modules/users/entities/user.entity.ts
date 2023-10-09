import { Entity, PrimaryColumn, Column } from 'typeorm';
import { UserStatus } from '../constants';

@Entity('users')
export class User {
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
  role: string;
}
