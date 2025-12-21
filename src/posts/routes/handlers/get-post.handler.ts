import { Request, Response } from 'express';
import { mapToPostOutputUtil } from '../mappers/mapToPostOutputUtil';
import { postsService } from '../../application/posts.service';
import { errorsHandler } from '../../../core/errors/error.handler';

export async function getPostHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const id = req.params.id;
    const post = await postsService.findByIdOrFail(id);

    const postOutput = mapToPostOutputUtil(post);
    res.send(postOutput);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
