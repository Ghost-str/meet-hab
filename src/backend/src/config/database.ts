import { TypeOrmModule } from '@nestjs/typeorm';

export default function makeDatabaseConfig() {
  return TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +(process.env.POSTGRES_PORT || 3000),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    autoLoadEntities: true,
    synchronize: false,
  });
}
