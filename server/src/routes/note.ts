import express from 'express';
import { postNote, deleteNote, updateNote } from '../controllers/note';
import middleware from '../middleware';

const router = express.Router();
const { auth } = middleware;

router.post('/:projectId/bugs/:bugId/notes', auth, postNote);
router.delete('/:projectId/notes/:noteId', auth, deleteNote);
router.put('/:projectId/notes/:noteId', auth, updateNote);

export default router;
