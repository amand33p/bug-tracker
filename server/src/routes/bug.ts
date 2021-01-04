import express from 'express';
import { createBug, updateBug, closeBug, reopenBug } from '../controllers/bug';
import middleware from '../middleware';

const router = express.Router();
const { auth } = middleware;

router.post('/:projectId/bugs', auth, createBug);
router.put('/:projectId/bugs/:bugId', auth, updateBug);
router.post('/:projectId/bugs/:bugId/close', auth, closeBug);
router.post('/:projectId/bugs/:bugId/reopen', auth, reopenBug);

export default router;
