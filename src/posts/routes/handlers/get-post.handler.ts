import { Request, Response } from 'express';
import { postRepository } from '../../repositories/postRepository';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/middlewares/validation/input-validtion-result.middleware';

export function getPostHandler(req: Request, res: Response) {
  const id = req.params.id;
  const post = postRepository.findById(id);

  if (!post) {
    res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: 'id', message: 'Post not found' }]));

    return;
  }
  res.send(post);
}
