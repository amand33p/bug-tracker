import { Request, Response } from 'express';
import { Project } from '../entity/Project';
import { Member } from '../entity/Member';
import { createProjectValidator } from '../utils/validators';

export const createProject = async (req: Request, res: Response) => {
  const { name } = req.body;
  const memberIds = [...req.body.members, req.user] as string[];
  const { errors, valid } = createProjectValidator(name, memberIds);

  if (!valid) {
    return res.status(400).send({ message: Object.values(errors)[0] });
  }

  const newProject = Project.create({
    name,
    createdById: req.user,
  });
  const savedProject = await newProject.save();

  const membersArray = memberIds.map((memberId) => ({
    memberId: memberId,
    projectId: savedProject.id,
  }));

  await Member.insert(membersArray);
  res.status(201).json(savedProject);
};
