import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CredentialsDto } from '../../dto/credentials.dto';
import { User } from '../../entities/user.entity';
import jwt from 'jsonwebtoken';
import { scrypt } from 'node:crypto';
import { CreateUserDto } from '../../dto/create-user.dto';
import { ConfigService } from '@nestjs/config';

const APP_KEY = 'BACKEND_APP_KEY';

@Injectable()
export class AuthService {
  protected hashLength = 40;
  protected expiresIn = 60 * 60 * 27 * 7;

  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

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

    const user = await this.usersService.create({
      ...newUser,
      password: passwordHash,
    });

    return {
      authKey: this.makeAuthKey(user),
      user,
    };
  }

  protected async makePasswordHash(password: string): Promise<string> {
    return new Promise((resolv, reject) => {
      let appKey: string;
      try {
        appKey = this.configService.getOrThrow(APP_KEY);
      } catch (e) {
        return reject(e);
      }

      scrypt(password, appKey, this.hashLength, (err, key) => {
        if (err) {
          return reject(err);
        } else {
          return resolv(key.toString('base64'));
        }
      });
    });
  }

  protected makeAuthKey(user: User): string {
    return jwt.sign(
      {
        id: user.id,
      },
      this.configService.getOrThrow<string>(APP_KEY),
      { expiresIn: this.expiresIn },
    );
  }
}
