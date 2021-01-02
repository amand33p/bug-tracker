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

export const editProjectName = async (req: Request, res: Response) => {
  const { name } = req.body;
  const { id } = req.params;

  if (!name || name.trim() === '' || name.length > 30) {
    return res
      .status(400)
      .send({ message: 'Project name length must not be more than 30.' });
  }

  const targetProject = await Project.findOne({ id });

  if (!targetProject) {
    return res.status(404).send({ message: 'Invalid project ID.' });
  }

  if (targetProject.createdById !== req.user) {
    return res.status(401).send({ message: 'Access is denied.' });
  }

  targetProject.name = name;
  await targetProject.save();

  res.json(targetProject);
};
