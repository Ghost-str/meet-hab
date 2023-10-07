import { seeder } from 'nestjs-seeder';
import { TYPE_ORM } from '../config/database';
import { ConfigModule } from '@nestjs/config';
import { User } from '../modules/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import UsersSeeder from './users-seeder';
import { UsersModule } from '../modules/users/users.module';

seeder({
  imports: [
    TYPE_ORM,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([User]),
    UsersModule,
  ],
}).run([UsersSeeder]);
