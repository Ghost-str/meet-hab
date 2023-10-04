import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CredentialsDto } from '../../dto/credentials.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(data: CredentialsDto) {
    const user = await this.usersService.findByLogin(data.login);

    if (!user || user.password !== data.password) {
      return null;
    }

    return user;
  }
}
