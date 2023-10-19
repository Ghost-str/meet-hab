import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { makeTypeOrmModule } from './config/database';
import { ConfigModule } from '@nestjs/config';
import config from './config/config.options';
import { UserMiddleware } from './modules/users/UserMiddleware';

const TYPE_ORM = makeTypeOrmModule();

@Module({
  imports: [ConfigModule.forRoot(config), TYPE_ORM, UsersModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('*');
  }
}
