import express from 'express';
import {
  createProject,
  editProjectName,
  getProjects,
  removeProjectMembers,
} from '../controllers/project';
import middleware from '../middleware';

const router = express.Router();
const { auth } = middleware;

router.get('/', auth, getProjects);
router.post('/', auth, createProject);
router.put('/:id', auth, editProjectName);
router.delete('/:id/members', auth, removeProjectMembers);

export default router;
