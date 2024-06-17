import { Logger } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig();
const penv = process.env;

const host = penv.DB_HOST as string,
  username = penv.DB_UNAME as string,
  password = penv.DB_PASSWORD as string,
  database = penv.DATABASE as string,
  dbPort = penv.PORT as string;

const config = {
  type: 'mysql',
  host: host,
  port: parseInt(dbPort),
  username: username,
  password: password,
  database: database,
  entities: [join(__dirname, 'dist/**/*.entity.{.ts,.js}')],
  migrations: [join(__dirname, 'src/migration/*{.ts,.js}')],
  autoLoadEntities: true,
  synchronize: false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);

connectionSource
  .initialize()
  .then(() => {
    Logger.log('Data base connected successfully....');
  })
  .catch((error) => {
    Logger.error(error);
  });
