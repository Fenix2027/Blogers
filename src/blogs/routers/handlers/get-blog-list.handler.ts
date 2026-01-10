import { Request, Response } from 'express';
import { BlogQueryInput } from '../input/blog-query.input';
import { matchedData } from 'express-validator';
import { setDefaultSortAndPaginationIfNotExist } from '../../../core/helpers/set-default-sort-and-pagination';
import { blogsService } from '../../application/blogs.servises';
import { mapToBlogListPaginatedOutput } from '../mappers/map-to-blog-list-paginated-output.util';
import { errorsHandler } from '../../../core/errors/error.handler';

export async function getBlogListHandler(
  req: Request<{}, {}, {}, any>,
  res: Response,
) {
  try {
    const sanitizedQuery = matchedData(req, {
      locations: ['query'],
      includeOptionals: true,
    })as BlogQueryInput;
    const queryInput = setDefaultSortAndPaginationIfNotExist(sanitizedQuery);
    const { items, totalCount } = await blogsService.findMany(queryInput);

    const blogsListOutput = mapToBlogListPaginatedOutput(items, {
      pageNumber: queryInput.pageNumber,
      pageSize: queryInput.pageSize,
      totalCount,
    });

    res.status(200).json(blogsListOutput);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}