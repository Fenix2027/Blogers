import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { postsService } from '../../application/posts.service';
import { PostUpdateInput } from '../input/post-update.input';

export async function updatePostHandler(
  req: Request<{ id: string }, {}, PostUpdateInput>,
  res: Response,
) {
  try {
    const id = req.params.id;

    await postsService.update(id, req.body.data.attributes);
    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
