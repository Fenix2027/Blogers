import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { PostAttributes } from '../../application/dtos/post-attributes';
import { postRepository } from '../../repositories/postRepository';

export async function updatePostHandler(
  req: Request<{ id: string }, {}, PostAttributes>,
  res: Response,
) {
  try {
    const id = req.params.id;
    const post = await postRepository.findById(id);

    if (!post) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ field: 'id', message: 'Post not found' }]),
        );
      return;
    }

    await postRepository.update(id, req.body);
    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
