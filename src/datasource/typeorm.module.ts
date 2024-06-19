import { Logger } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import {  runSeeders,SeederOptions} from 'typeorm-extension';

dotenvConfig();
const penv = process.env;

const host = penv.DB_HOST,
  username = penv.DB_UNAME,
  password = penv.DB_PASSWORD,
  database = penv.DATABASE,
  dbPort = penv.PORT;

const config = {
  type: 'mysql',
  host: `${host}`,
  port: `${dbPort}`,
  username: `${username}`,
  password: `${password}`,
  database: `${database}`,
  entities: ['dist/**/*.entity*{.ts,.js}'], // dist/**/*.entity{.ts,.js}
  migrations: ['dist/migrations/*{.ts,.js}'],
  seeds: ['dist/seed/*.seeder*{.ts,.js}'],
  factories:['dist/seed/*.factory*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions & SeederOptions  );

connectionSource
  .initialize()
  .then(() => {
    Logger.log('Data base connected successfully....');
  })
  .catch((error) => {
    Logger.error(error);
  });


// runSeeders(connectionSource).then(()=>{
//   Logger.log("Seeder execute successfully")
// }).catch((error)=>{
//   Logger.error(error)
// })