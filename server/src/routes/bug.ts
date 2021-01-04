import express from 'express';
import { createBug, updateBug } from '../controllers/bug';
import middleware from '../middleware';

const router = express.Router();
const { auth } = middleware;

router.post('/:projectId/bugs', auth, createBug);
router.put('/:projectId/bugs/:bugId', auth, updateBug);

export default router;
