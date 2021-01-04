import { Request, Response } from 'express';
import { Member } from '../entity/Member';
import { Note } from '../entity/Note';

export const postNote = async (req: Request, res: Response) => {
  const { body } = req.body;
  const { projectId, bugId } = req.params;

  if (!body || body.trim() === '') {
    return res
      .status(400)
      .send({ message: 'Note body field must not be empty.' });
  }

  const projectMembers = await Member.find({ projectId });
  const memberIds = projectMembers.map((m) => m.memberId);

  if (!memberIds.includes(req.user)) {
    return res
      .status(401)
      .send({ message: 'Access is denied. Not a member of the project.' });
  }

  const newNote = Note.create({ body, authorId: req.user, bugId });
  await newNote.save();
  res.status(201).json(newNote);
};

export const deleteNote = async (req: Request, res: Response) => {
  const { projectId, noteId } = req.params;

  const projectMembers = await Member.find({ projectId });
  const memberIds = projectMembers.map((m) => m.memberId);

  if (!memberIds.includes(req.user)) {
    return res
      .status(401)
      .send({ message: 'Access is denied. Not a member of the project.' });
  }

  const targetNote = await Note.findOne({ id: Number(noteId) });

  if (!targetNote) {
    return res.status(404).send({ message: 'Invalid note ID.' });
  }

  if (targetNote.authorId !== req.user) {
    return res.status(401).send({ message: 'Access is denied.' });
  }

  await Note.delete({ id: Number(noteId) });
  res.status(204).end();
};
