import app from './app';
import http from 'http';
import { PORT } from './utils/config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

const server = http.createServer(app);

createConnection()
  .then(() => {
    console.log('PSQL connected!');
  })
  .catch((error) => console.log(error));

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
