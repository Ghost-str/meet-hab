import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TYPE_ORM } from './config/database';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TYPE_ORM, UsersModule, ConfigModule.forRoot({ isGlobal: true })],
  exports: [TYPE_ORM],
})
export class AppModule {}
