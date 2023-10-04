import { DataSource } from 'typeorm';
import { config } from './database';

export default new DataSource({
  ...config,
  migrations: ['src/migrations/*'],
});
