import { Request, Response } from 'express';
import { User } from '../entity/User';
import { Not } from 'typeorm';

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find({
    where: { id: Not(req.user) },
    select: ['id', 'username'],
  });

  res.json(users);
};
