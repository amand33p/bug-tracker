import { Request, Response } from 'express';
import { Project } from '../entity/Project';
import { Member } from '../entity/Member';

export const createProject = async (req: Request, res: Response) => {
  const { name } = req.body;
  const memberIds = req.body.members as string[];

  const newProject = Project.create({
    name,
    createdById: req.user,
  });
  const savedProject = await newProject.save();

  const membersArray = memberIds.map((memberId) => ({
    projectId: savedProject.id,
    memberId: memberId,
  }));

  await Member.insert(membersArray);

  res.status(201).json(savedProject);
};
