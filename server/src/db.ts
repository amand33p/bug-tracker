import 'reflect-metadata';
import { createConnection } from 'typeorm';

export const connectToDB = async () => {
  try {
    await createConnection();
    console.log('PSQL connected!');
  } catch (error) {
    console.log(error);
  }
};
