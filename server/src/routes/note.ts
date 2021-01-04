import express from 'express';
import { postNote, deleteNote } from '../controllers/note';
import middleware from '../middleware';

const router = express.Router();
const { auth } = middleware;

router.post('/:projectId/bugs/:bugId/notes', auth, postNote);
router.delete('/:projectId/notes/:noteId', auth, deleteNote);

export default router;
