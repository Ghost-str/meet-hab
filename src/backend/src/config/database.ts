import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';


export function makeDataSourceConfig(): DataSourceOptions {
  return   {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +(process.env.POSTGRES_PORT || 5432),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false,
  }
}

export function makeTypeOrmModule() {
  return TypeOrmModule.forRoot({
  ...makeDataSourceConfig(),
  autoLoadEntities: true,
});
}
