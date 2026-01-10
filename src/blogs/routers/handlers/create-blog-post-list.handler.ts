import { Request, Response } from 'express';
import { errorsHandler } from '../../../core/errors/error.handler';
import { postsService } from '../../../posts/application/posts.service';
import { mapToPostOutputUtil } from '../../../posts/routes/mappers/mapToPostOutputUtil';
import { HttpStatus } from '../../../core/types/http-statuses';
import { PostAttributes } from '../../../posts/application/dtos/post-attributes';

export async function createBlogPostsListHandler(
  req: Request<{ id: string }, {}, PostAttributes>,
  res: Response,
) {
  try {
    const id = req.params.id;

    const createdPostId = await postsService.createPost(req.body, id);

    const createdPost = await postsService.findByIdOrFail(createdPostId);

    const postOutput = mapToPostOutputUtil(createdPost);

    res.status(HttpStatus.Created).send(postOutput);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
