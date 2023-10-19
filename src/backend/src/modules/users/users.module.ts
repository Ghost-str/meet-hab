import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ENTITIES from './entities/entity.list';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { APP_KEY } from './constants';
import { HashService } from './services/HashService';
import { UserMiddleware } from './UserMiddleware';
import { UserLocalStorage } from './UserLocalStorage';

@Module({
  imports: [
    TypeOrmModule.forFeature(ENTITIES),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>(APP_KEY),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    UsersService,
    AuthService,
    HashService,
    UserMiddleware,
    UserLocalStorage,
  ],
  exports: [AuthService, UserMiddleware],
})
export class UsersModule {}
