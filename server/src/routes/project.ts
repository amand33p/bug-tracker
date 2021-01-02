import express from 'express';
import { createProject } from '../controllers/project';
import middleware from '../middleware';

const router = express.Router();
const { auth } = middleware;

router.post('/', auth, createProject);

export default router;
