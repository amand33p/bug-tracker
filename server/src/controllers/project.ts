import { Request, Response } from 'express';
import { Project } from '../entity/Project';
import { Member } from '../entity/Member';
import { Bug } from '../entity/Bug';
import { createProjectValidator, projectNameError } from '../utils/validators';

export const getProjects = async (req: Request, res: Response) => {
  const projects = await Project.createQueryBuilder('project')
    .leftJoin('project.members', 'projectMember')
    .leftJoinAndSelect('project.members', 'members')
    .leftJoinAndSelect('project.createdBy', 'createdBy')
    .leftJoinAndSelect('members.member', 'member')
    .where('projectMember.memberId = :userId', { userId: req.user })
    .select([
      'project.id',
      'project.name',
      'createdBy.id',
      'createdBy.username',
      'members.id',
      'member.id',
      'member.username',
    ])
    .getMany();

  res.json(projects);
};

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
  const { projectId } = req.params;

  const nameValidationError = projectNameError(name);

  if (nameValidationError) {
    return res.status(400).send({ message: nameValidationError });
  }

  const targetProject = await Project.findOne({ id: projectId });

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

export const deleteProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;

  const targetProject = await Project.findOne({ id: projectId });

  if (!targetProject) {
    return res.status(404).send({ message: 'Invalid project ID.' });
  }

  if (targetProject.createdById !== req.user) {
    return res.status(401).send({ message: 'Access is denied.' });
  }

  await Member.delete({ projectId });
  await Bug.delete({ projectId });
  await targetProject.remove();
  res.status(204).end();
};
