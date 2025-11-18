import { Request, Response } from 'express';
import { blogsRepository } from '../../repositories/blogsRepository';

export function getDriverListHandler(req: Request, res: Response) {
  const drivers = blogsRepository.findAll();
  res.send(drivers);
}
