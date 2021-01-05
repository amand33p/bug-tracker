import express from 'express';
import {
  createProject,
  editProjectName,
  getProjects,
  deleteProject,
} from '../controllers/project';
import middleware from '../middleware';

const router = express.Router();
const { auth } = middleware;

router.get('/', auth, getProjects);
router.post('/', auth, createProject);
router.put('/:projectId', auth, editProjectName);
router.delete('/:projectId', auth, deleteProject);

export default router;
