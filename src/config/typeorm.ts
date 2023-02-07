import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

const {
  DB_TYPE,
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_PORT,
  DB_DATABASE,
  DB_LOGGING,
} = process.env;

module.exports.dataSource = new DataSource({
  type: DB_TYPE,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  logging: DB_LOGGING,
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
} as DataSourceOptions);
