import 'reflect-metadata';
import { createConnection } from 'typeorm';

export const initializeDB = (): void => {
  createConnection()
    .then(() => {
      console.log('PSQL connected!');
    })
    .catch((error) => console.log(error));
};
