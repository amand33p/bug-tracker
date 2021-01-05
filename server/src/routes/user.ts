import express from 'express';
import { getAllUsers } from '../controllers/user';
import middleware from '../middleware';

const router = express.Router();
const { auth } = middleware;

router.get('/', auth, getAllUsers);

export default router;
