import express from 'express';
import { signupUser, loginUser } from '../controllers/auth';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);

export default router;
