import { Request, Response } from 'express';
import { postsService } from '../../application/posts.service';
import { setDefaultSortAndPaginationIfNotExist } from '../../../core/helpers/set-default-sort-and-pagination';
import { matchedData } from 'express-validator';
import { PostQueryInput } from '../input/post-query.input';
import { errorsHandler } from '../../../core/errors/error.handler';
import { mapToPostListPaginatedOutput } from '../mappers/mapToPostListPaginatedOutput';

export async function getPostListHandler(
  req: Request<{}, {}, {}, PostQueryInput>,
  res: Response,
) {
  try {
    const sanitizedQuery = matchedData<PostQueryInput>(req, {
      locations: ['query'],
      includeOptionals: true,
    });
    const queryInput = setDefaultSortAndPaginationIfNotExist(sanitizedQuery);

    const { items, totalCount } = await postsService.findMany(queryInput);

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