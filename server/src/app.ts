import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import middleware from './middleware';
import authRoutes from './routes/auth';
import projectRoutes from './routes/project';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', authRoutes);
app.use('/projects', projectRoutes);

app.use(middleware.unknownEndPointHandler);
app.use(middleware.errorHandler);

export default app;
