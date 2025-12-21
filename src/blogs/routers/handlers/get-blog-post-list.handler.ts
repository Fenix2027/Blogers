import { Request, Response } from 'express';
import { errorsHandler } from '../../../core/errors/error.handler';
import { PostQueryInput } from '../../../posts/routes/input/post-query.input';
import { postsService } from '../../../posts/application/posts.service';
import { mapToPostListPaginatedOutput } from '../../../posts/routes/mappers/mapToPostListPaginatedOutput';

export async function getBlogPostsListHandler(
  req: Request<{ id: string }, {}, {}, PostQueryInput>,
  res: Response,
) {
  try {
    const blogId = req.params.id;
    const queryInput = req.query;

    const { items, totalCount } = await postsService.findPostsByBlog(
      queryInput,
      blogId,
    );

    const postListOutput = mapToPostListPaginatedOutput(items, {
      pageNumber: queryInput.pageNumber,
      pageSize: queryInput.pageSize,
      totalCount,
    });
    res.send(postListOutput);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
