import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ENTITIES from './entities/entity.list';

@Module({
  imports: [TypeOrmModule.forFeature(ENTITIES)],
  controllers: [AuthController],
  providers: [UsersService, AuthService],
  exports: [AuthService],
})
export class UsersModule {}
