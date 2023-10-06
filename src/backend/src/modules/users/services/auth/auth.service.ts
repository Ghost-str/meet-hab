import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CredentialsDto } from '../../dto/credentials.dto';
import { User } from '../../entities/user.entity';
import jwt from 'jsonwebtoken';
import { scrypt } from 'node:crypto';
import { CreateUserDto } from '../../dto/create-user.dto';

@Injectable()
export class AuthService {
  protected appKey: string;
  protected hashLength = 25;
  protected expiresIn = 60 * 60 * 27 * 7;

  constructor(private usersService: UsersService) {
    const key = process.env.BACKEND_APP_KEY;
    if (!key) {
      throw new Error('BACKEND_APP_KEY not set');
    }

    this.appKey = key;
  }

  async login(data: CredentialsDto) {
    const [user, passwordHash] = await Promise.all([
      this.usersService.findByLogin(data.login),
      this.makePasswordHash(data.password),
    ]);

    if (!user || user.password !== passwordHash) {
      return null;
    }

    return {
      authKey: this.makeAuthKey(user),
      user,
    };
  }

  async register(newUser: CreateUserDto) {
    const passwordHash = await this.makePasswordHash(newUser.password);

    return this.usersService.create({
      ...newUser,
      password: passwordHash,
    });
  }

  protected async makePasswordHash(password: string): Promise<string> {
    return new Promise((resolv, reject) => {
      scrypt(password, this.appKey, this.hashLength, (err, key) => {
        if (err) {
          return reject(err);
        } else {
          return resolv(key.toString('utf-8'));
        }
      });
    });
  }

  protected makeAuthKey(user: User): string {
    return jwt.sign(
      {
        id: user.id,
      },
      this.appKey,
      { expiresIn: this.expiresIn },
    );
  }
}
