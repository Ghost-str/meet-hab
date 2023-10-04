import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TYPE_ORM } from './config/database';

@Module({
  imports: [TYPE_ORM, UsersModule],
  exports: [TYPE_ORM],
})
export class AppModule {}
