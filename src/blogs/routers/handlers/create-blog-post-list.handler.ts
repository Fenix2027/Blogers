import { Request, Response } from 'express';
import { errorsHandler } from '../../../core/errors/error.handler';
import { postsService } from '../../../posts/application/posts.service';
import { mapToPostOutputUtil } from '../../../posts/routes/mappers/mapToPostOutputUtil';
import { PostCreateInput } from '../../../posts/routes/input/post-create.input';
import { HttpStatus } from '../../../core/types/http-statuses';

export async function createBlogPostsListHandler(
  req: Request<{id: string}, {}, PostCreateInput>,
  res: Response,
) {
  try {
    const blogId = req.params.id;

    const createdPost = await postsService.findByIdOrFail(blogId);

    const postOutput = mapToPostOutputUtil(createdPost);

    res.status(HttpStatus.Created).send(postOutput);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
