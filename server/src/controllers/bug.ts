import { Request, Response } from 'express';
import { Member } from '../entity/Member';
import { Bug } from '../entity/Bug';
import { createBugValidator } from '../utils/validators';

export const createBug = async (req: Request, res: Response) => {
  const { title, description, priority } = req.body;
  const { projectId } = req.params;

  const { errors, valid } = createBugValidator(title, description, priority);

  if (!valid) {
    return res.status(400).send({ message: Object.values(errors)[0] });
  }

  const projectMembers = await Member.find({ projectId });
  const memberIds = projectMembers.map((m) => m.memberId);

  if (!memberIds.includes(req.user)) {
    return res.status(401).send({ message: 'Access is denied.' });
  }

  const newBug = Bug.create({
    title,
    description,
    priority,
    projectId,
    createdById: req.user,
  });

  await newBug.save();
  return res.status(201).json(newBug);
};

export const updateBug = async (req: Request, res: Response) => {
  const { title, description, priority } = req.body;
  const { projectId, bugId } = req.params;

  const { errors, valid } = createBugValidator(title, description, priority);

  if (!valid) {
    return res.status(400).send({ message: Object.values(errors)[0] });
  }

  const projectMembers = await Member.find({ projectId });
  const memberIds = projectMembers.map((m) => m.memberId);

  if (!memberIds.includes(req.user)) {
    return res.status(401).send({ message: 'Access is denied.' });
  }

  const targetBug = await Bug.createQueryBuilder('bug')
    .update(Bug)
    .set({
      title,
      description,
      priority,
      updatedById: req.user,
      updatedAt: new Date(),
    })
    .where('id = :bugId', { bugId })
    .returning('*')
    .updateEntity(true)
    .execute()
    .then((res) => res.raw[0]);

  return res.json(targetBug);
};
