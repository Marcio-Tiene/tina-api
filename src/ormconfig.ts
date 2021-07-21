import { ConnectionOptions } from 'typeorm';
import 'reflect-metadata';

import * as dotenv from 'dotenv';
import * as fs from 'fs';

const data: any = dotenv.parse(fs.readFileSync(`.env`));
// const config: ConnectionOptions = {
//   type: 'postgres',
//   url: data.DATABASE_URL,
//   synchronize: false,

//   migrationsRun: false,

//   migrationsTableName: 'migrations_typeorm',
//   entities: [__dirname + '/**/*.entity{.ts,.js}'],
//   logging: ['migration', 'error'],
//   logger: 'advanced-console',
//   migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
//   cli: {
//     // Location of migration should be inside src folder
//     // to be compiled into dist/ folder.
//     migrationsDir: 'src/migrations',
//   },
const config: ConnectionOptions = {
  type: 'mongodb',
  url: data.MONGODB,
  synchronize: true,
  database: 'tina-db',

  migrationsRun: false,

  migrationsTableName: 'migrations_typeorm',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  logging: ['migration', 'error'],
  logger: 'advanced-console',
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscriber',
  },
};

export = config;
