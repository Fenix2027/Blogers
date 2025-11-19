import { Request, Response } from 'express';
import { postRepository } from '../../repositories/postRepository';

export function getPostsListHandler(req: Request, res: Response) {
  const rides = postRepository.findAll();
  res.send(rides);
}
