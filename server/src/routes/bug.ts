import express from 'express';
import {
  getBugs,
  createBug,
  updateBug,
  deleteBug,
  closeBug,
  reopenBug,
} from '../controllers/bug';
import middleware from '../middleware';

const router = express.Router();
const { auth } = middleware;

router.get('/:projectId/bugs', auth, getBugs);
router.post('/:projectId/bugs', auth, createBug);
router.put('/:projectId/bugs/:bugId', auth, updateBug);
router.delete('/:projectId/bugs/:bugId', auth, deleteBug);
router.post('/:projectId/bugs/:bugId/close', auth, closeBug);
router.post('/:projectId/bugs/:bugId/reopen', auth, reopenBug);

export default router;
