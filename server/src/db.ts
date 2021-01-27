import 'reflect-metadata';
import {
  getConnectionOptions,
  ConnectionOptions,
  createConnection,
} from 'typeorm';
import dotenv from 'dotenv';
dotenv.config();

const getConfig = async () => {
  let connectionOptions: ConnectionOptions;
  connectionOptions = {
    type: 'postgres',
    synchronize: false,
    logging: false,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    entities: ['build/entity/*.*'],
    migrations: ['build/migration/*.*'],
  };

  if (process.env.DATABASE_URL) {
    Object.assign(connectionOptions, {
      url: process.env.DATABASE_URL,
    });
  } else {
    connectionOptions = await getConnectionOptions();
  }

  return connectionOptions;
};

const connectToDb = async (): Promise<void> => {
  const config = await getConfig();
  await createConnection(config);
};

export const initializeDB = (): void => {
  connectToDb()
    .then(() => {
      console.log('PSQL connected!');
    })
    .catch((error) => console.log(error));
};
