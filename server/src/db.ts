import 'reflect-metadata';
import {
  getConnectionOptions,
  ConnectionOptions,
  createConnection,
} from 'typeorm';

const getOptions = async () => {
  let connectionOptions: ConnectionOptions;
  connectionOptions = {
    type: 'postgres',
    synchronize: false,
    logging: true,
    extra: {
      ssl: true,
    },
    entities: ['build/entity/*.*'],
  };
  if (process.env.DATABASE_URL) {
    Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
  } else {
    connectionOptions = await getConnectionOptions();
  }

  return connectionOptions;
};

const connectToDb = async (): Promise<void> => {
  const typeormConfig = await getOptions();
  await createConnection(typeormConfig);
};

export const initializeDB = (): void => {
  connectToDb()
    .then(() => {
      console.log('PSQL connected!');
    })
    .catch((error) => console.log(error));
};
