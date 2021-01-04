import express from 'express';
import { addProjectMembers, removeProjectMember } from '../controllers/member';
import middleware from '../middleware';

const router = express.Router();
const { auth } = middleware;

router.post('/:projectId/members', auth, addProjectMembers);
router.delete('/:projectId/members', auth, removeProjectMember);

export default router;
