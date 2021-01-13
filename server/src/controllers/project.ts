import { Request, Response } from 'express';
import { Project } from '../entity/Project';
import { Member } from '../entity/Member';
import { Bug } from '../entity/Bug';
import { createProjectValidator, projectNameError } from '../utils/validators';

const fieldsToSelect = [
  'project.id',
  'project.name',
  'project.createdAt',
  'project.updatedAt',
  'createdBy.id',
  'createdBy.username',
  'members.id',
  'members.joinedAt',
  'member.id',
  'member.username',
  'bug.id',
];

export const getProjects = async (req: Request, res: Response) => {
  const projects = await Project.createQueryBuilder('project')
    .leftJoin('project.members', 'projectMember')
    .where('projectMember.memberId = :userId', { userId: req.user })
    .leftJoinAndSelect('project.members', 'members')
    .leftJoinAndSelect('project.createdBy', 'createdBy')
    .leftJoinAndSelect('members.member', 'member')
    .leftJoinAndSelect('project.bugs', 'bug')
    .select(fieldsToSelect)
    .getMany();

  res.json(projects);
};

export const createProject = async (req: Request, res: Response) => {
  const { name } = req.body;
  const memberIds = req.body.members
    ? ([req.user, ...req.body.members] as string[])
    : [req.user];

  const { errors, valid } = createProjectValidator(name, memberIds);

  if (!valid) {
    return res.status(400).send({ message: Object.values(errors)[0] });
  }

  const newProject = Project.create({
    name,
    createdById: req.user,
  });

  await newProject.save();

  const membersArray = memberIds.map((memberId) => ({
    memberId: memberId,
    projectId: newProject.id,
  }));

  await Member.insert(membersArray);

  const relationedProject = await Project.createQueryBuilder('project')
    .where('project.id = :projectId', { projectId: newProject.id })
    .leftJoinAndSelect('project.members', 'members')
    .leftJoinAndSelect('project.createdBy', 'createdBy')
    .leftJoinAndSelect('members.member', 'member')
    .leftJoinAndSelect('project.bugs', 'bug')
    .select(fieldsToSelect)
    .getOne();

  res.status(201).json(relationedProject);
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
