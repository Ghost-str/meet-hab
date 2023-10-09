import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { AuthService } from '../modules/users/services/auth/auth.service';
import { faker } from '@faker-js/faker';
import { times } from 'lodash';
import { Repository } from 'typeorm';
import { User } from '../modules/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export default class UsersSeeder implements Seeder {
  constructor(
    private authService: AuthService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async seed(): Promise<void> {
    const users = times(10, () => {
      return this.authService.register({
        id: faker.string.uuid(),
        login: faker.internet.userName(),
        password: 'Password12345!{',
        email: faker.internet.email(),
      });
    });

    await Promise.all(users);
  }

  async drop(): Promise<void> {
    await this.usersRepository.clear();
  }
}
