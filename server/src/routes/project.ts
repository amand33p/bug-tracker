import express from 'express';
import { createProject, editProjectName } from '../controllers/project';
import middleware from '../middleware';

const router = express.Router();
const { auth } = middleware;

router.post('/', auth, createProject);
router.put('/:id', auth, editProjectName);

export default router;
