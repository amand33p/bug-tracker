import app from './app';
import http from 'https';
import { PORT } from './utils/config';
import { connectToDB } from './db';

connectToDB();

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
