import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CredentialsDto } from '../../dto/credentials.dto';
import { IUser } from '../../entities/user.entity';
import { CreateUserDto } from '../../dto/create-user.dto';
import Response from '../../../../shared-types/response';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '../HashService';
import { SESSION_COOKIE_KEY } from '../../constants';
import get from 'lodash/get'; 


@Injectable()
export class AuthService {
  protected hashLength = 40;
  protected expiresIn = 60 * 60 * 27 * 7;

  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService, 
  ) {}

  async login(data: CredentialsDto, res?: Response) {
    const [user, passwordHash] = await Promise.all([
      this.usersService.findByLogin(data.login),
      this.hashService.hash(data.password),
    ]);


    return user.password !== passwordHash ? this.makeResult(user, res) : null;
  }

  async register(newUser: CreateUserDto, res?: Response) {
    const password = await this.hashService.hash(newUser.password);

    const user = await this.usersService.create({
      ...newUser,
      password,
    });

    return this.makeResult(user, res);
  }

  async auth(token?: string): Promise<IUser> {
    if (!token) {
      return UsersService.getNullUser();
    }
    try {
    const {id}= await this.jwtService.verifyAsync<{id: string}>(token);
    return this.usersService.findById(id);
    } finally {
      return UsersService.getNullUser()
    }
  }

  protected async makeResult(user: IUser, res?: Response) {
    const authKey = await this.makeAuthKey(user);

    if (res) {
      res.setCookie(SESSION_COOKIE_KEY, authKey, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: this.expiresIn,
      });
    }

    return {
      authKey,
      user,
    };
  }


  protected makeAuthKey(user: IUser): Promise<string> {
   return this.jwtService.signAsync({
      id: user.id,
    },{ expiresIn: this.expiresIn } );
  }
}
