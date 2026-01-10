import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { postsService } from '../../application/posts.service';
import { mapToPostOutputUtil } from '../mappers/mapToPostOutputUtil';
import { errorsHandler } from '../../../core/errors/error.handler';
import { PostAttributes } from '../../application/dtos/post-attributes';

export async function createPostHandler(
  req: Request<{}, {}, PostAttributes>,
  res: Response,
) {
  try {
    const createdPostId = await postsService.create(req.body);

    const createdPost = await postsService.findByIdOrFail(createdPostId);

    const postOutput = mapToPostOutputUtil(createdPost);

    res.status(HttpStatus.Created).send(postOutput);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
