import { Request, Response } from 'express';

const unknownEndPointHandler = (_req: Request, res: Response): void => {
  res.status(404).send({ message: 'Unknown endpoint.' });
};

export default unknownEndPointHandler;
