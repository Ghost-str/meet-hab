import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { makeTypeOrmModule } from './config/database';
import { ConfigModule } from '@nestjs/config';
import config from './config/config.options';

const TYPE_ORM = makeTypeOrmModule();

@Module({
  imports: [ConfigModule.forRoot(config), TYPE_ORM, UsersModule],
})
export class AppModule {}
