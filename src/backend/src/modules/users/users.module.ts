import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ENTITIES from './entities/entity.list';
import {JwtModule} from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { APP_KEY } from './constants';
import { HashService } from './services/HashService';

@Module({
  imports: [TypeOrmModule.forFeature(ENTITIES), 
    JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>(APP_KEY),
    }),
    inject:[ConfigService]
  })],
  controllers: [AuthController],
  providers: [UsersService, AuthService, HashService],
  exports: [AuthService],
})
export class UsersModule {}
