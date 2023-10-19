import { AsyncLocalStorage } from 'async_hooks';
import { IUser } from './entities/user.entity';
import { UsersService } from './services/users/users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserLocalStorage {
  private storage = new AsyncLocalStorage<IUser>();

  run(store: IUser, cb: () => unknown) {
    this.storage.run(store, cb);
  }

  get user() {
    const user = this.storage.getStore();

    return user ?? UsersService.getNullUser();
  }
}
