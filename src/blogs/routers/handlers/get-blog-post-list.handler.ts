import { Request, Response } from 'express';
import { errorsHandler } from '../../../core/errors/error.handler';
import { PostQueryInput } from '../../../posts/routes/input/post-query.input';
import { postsService } from '../../../posts/application/posts.service';
import { mapToPostListPaginatedOutput } from '../../../posts/routes/mappers/mapToPostListPaginatedOutput';
import { matchedData } from 'express-validator';
import { setDefaultSortAndPaginationIfNotExist } from '../../../core/helpers/set-default-sort-and-pagination';
import { RepositoryNotFoundError } from '../../../core/errors/repository-not-found.error';

export async function getBlogPostsListHandler(
  req: Request<{ id: string }, any, any, any>,
  res: Response,
) {
  try {
    const blogId = req.params.id;

    const sanitizedQuery = matchedData(req, {
      locations: ['query'],
      includeOptionals: true,
    }) as PostQueryInput;

    const queryInput = setDefaultSortAndPaginationIfNotExist(sanitizedQuery);

    const result = await postsService.findPostsByBlog(
      queryInput,
      blogId,
    );

    if (!result) {
      throw new RepositoryNotFoundError('Blog not found');
    }

    const { items, totalCount } = result;

    const postListOutput = mapToPostListPaginatedOutput(items, {
      pageNumber: queryInput.pageNumber,
      pageSize: queryInput.pageSize,
      totalCount,
    });

    res.status(200).json(postListOutput);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}