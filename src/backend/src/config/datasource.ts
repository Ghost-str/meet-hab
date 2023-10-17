import { DataSource } from 'typeorm';
import { makeDataSourceConfig } from './database';

export default new DataSource({
  ...makeDataSourceConfig(),
  migrations: ['src/migrations/*'],
});
