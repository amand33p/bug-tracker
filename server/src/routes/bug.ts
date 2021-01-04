import express from 'express';
import { createBug } from '../controllers/bug';
import middleware from '../middleware';

const router = express.Router();
const { auth } = middleware;

router.post('/:projectId/bugs', auth, createBug);

export default router;
