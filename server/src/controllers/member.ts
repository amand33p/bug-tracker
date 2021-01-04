import { Request, Response } from 'express';
import { Project } from '../entity/Project';
import { Member } from '../entity/Member';
import { projectMembersError } from '../utils/validators';

export const removeProjectMember = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const { projectId } = req.params;

  const targetProject = await Project.findOne({
    where: { id: projectId },
    relations: ['members'],
  });

  if (!targetProject) {
    return res.status(404).send({ message: 'Invalid project ID.' });
  }

  if (targetProject.createdById !== req.user) {
    return res.status(401).send({ message: 'Access is denied.' });
  }

  if (targetProject.createdById === userId) {
    return res
      .status(400)
      .send({ message: "Project creator can't be removed." });
  }

  if (!targetProject.members.map((m) => m.memberId).includes(userId)) {
    return res.status(404).send({
      message: "Member isn't part of the project or already removed.",
    });
  }

  await Member.delete({ projectId, memberId: userId });
  res.status(204).end();
};

export const addProjectMembers = async (req: Request, res: Response) => {
  const memberIds = req.body.members as string[];
  const { projectId } = req.params;

  if (memberIds.length === 0) {
    return res
      .status(400)
      .send({ message: 'Members field must not be an empty array.' });
  }

  const targetProject = await Project.findOne({
    where: { id: projectId },
    relations: ['members'],
  });

  if (!targetProject) {
    return res.status(404).send({ message: 'Invalid project ID.' });
  }

  if (targetProject.createdById !== req.user) {
    return res.status(401).send({ message: 'Access is denied.' });
  }

  const currentMembers = targetProject.members.map((m) => m.memberId);

  const membersValidationError = projectMembersError([
    ...currentMembers,
    ...memberIds,
  ]);

  if (membersValidationError) {
    return res.status(400).send({ message: membersValidationError });
  }

  const membersArray = memberIds.map((memberId) => ({
    memberId,
    projectId,
  }));

  await Member.insert(membersArray);

  const updatedMembers = await Member.createQueryBuilder('projectMember')
    .leftJoinAndSelect('projectMember.member', 'member')
    .where('projectMember.projectId = :projectId', { projectId })
    .select(['projectMember.id', 'member.id', 'member.username'])
    .getMany();

  res.status(201).json(updatedMembers);
};
