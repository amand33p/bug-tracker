import express from 'express';
import {
  addProjectMembers,
  removeProjectMember,
  leaveProjectAsMember,
} from '../controllers/member';
import middleware from '../middleware';

const router = express.Router();
const { auth } = middleware;

router.post('/:projectId/members', auth, addProjectMembers);
router.delete('/:projectId/members/:memberId', auth, removeProjectMember);
router.post('/:projectId/members/leave', auth, leaveProjectAsMember);

export default router;
