import { Logger, Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TYPE_ORM } from './config/database';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TYPE_ORM, UsersModule, ConfigModule.forRoot({ isGlobal: true })],
  providers: [Logger],
})
export class AppModule {}
