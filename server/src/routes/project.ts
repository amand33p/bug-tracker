import express from 'express';
import {
  createProject,
  editProjectName,
  getProjects,
} from '../controllers/project';
import middleware from '../middleware';

const router = express.Router();
const { auth } = middleware;

router.get('/', auth, getProjects);
router.post('/', auth, createProject);
router.put('/:projectId', auth, editProjectName);

export default router;
