import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { PostInputDto } from '../../dto/post-input.dto';
import { postRepository } from '../../repositories/postRepository';

export function updatePostHandler(
  req: Request<{ id: string }, {}, PostInputDto>,
  res: Response,
) {
  const id = req.params.id;
  const post = postRepository.findById(id);

  if (!post) {
    res
      .status(HttpStatus.NotFound)
      .send(createErrorMessages([{ field: 'id', message: 'Post not found' }]));
    return;
  }

  postRepository.update(id, req.body);
  res.sendStatus(HttpStatus.NoContent);
}
