import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { postsService } from '../../application/posts.service';
import { PostUpdateInput } from '../input/post-update.input';
import { errorsHandler } from '../../../core/errors/error.handler';

export async function updatePostHandler(
  req: Request<{ id: string }, {}, PostUpdateInput>,
  res: Response,
) {
  try {
    const id = req.params.id;

    await postsService.update(id, req.body);
    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
