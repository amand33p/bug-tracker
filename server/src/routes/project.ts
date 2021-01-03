import express from 'express';
import {
  addProjectMembers,
  createProject,
  editProjectName,
  getProjects,
  removeProjectMember,
} from '../controllers/project';
import middleware from '../middleware';

const router = express.Router();
const { auth } = middleware;

router.get('/', auth, getProjects);
router.post('/', auth, createProject);
router.put('/:id', auth, editProjectName);
router.post('/:id/members', auth, addProjectMembers);
router.delete('/:id/members', auth, removeProjectMember);

export default router;
