import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../dto/create-user.dto';
import { IUser, User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { DEFAULT_ROLE, UserStatus } from '../../constants';
import { InjectRepository } from '@nestjs/typeorm';
import { NullUser } from '../NullUser';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(newUser: CreateUserDto) {
    return this.userRepository.save({
      ...newUser,
      role: DEFAULT_ROLE,
      status: UserStatus.Active,
    });
  }

  async findByLogin(login: string): Promise<IUser> {
    const fUser = await this.userRepository.findOneBy({
      login,
      status: UserStatus.Active,
    });

    return fUser ?? UsersService.getNullUser();
  }

  async findById(id: string): Promise<IUser> {
    const fUser = await this.userRepository.findOneBy({
      id,
      status: UserStatus.Active,
    });

    return fUser ?? UsersService.getNullUser();
  }


  static getNullUser() {
    return new NullUser();
  }
}
