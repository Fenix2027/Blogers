import { Request, Response } from 'express';
import { blogsRepository } from '../../repositories/blogsRepository';
import { mapToBlogsViewModel } from '../mappers/map-to-blogs-view-model.util';
import { HttpStatus } from '../../../core/types/http-statuses';
import { BlogQueryInput } from '../input/blog-query.input';
import { matchedData } from 'express-validator';
import { setDefaultSortAndPaginationIfNotExist } from '../../../core/helpers/set-default-sort-and-pagination';
import { BlogsService } from '../../application/blogs.servises';
import { mapToBlogListPaginatedOutput } from '../mappers/map-to-blog-list-paginated-output.util';

export async function getBlogListHandler(req: Request<{}, {}, {}, BlogQueryInput>,
  res: Response,
) {
  try {
    const sanitizedQuery = matchedData<BlogQueryInput>(req, {
      locations: ['query'],
      includeOptionals: true,
    });
    const queryInput = setDefaultSortAndPaginationIfNotExist(sanitizedQuery);

    const { items, totalCount } = await BlogsService.findMany(queryInput);

    const blogsListOutput = mapToBlogListPaginatedOutput(items, {
      pageNumber: queryInput.pageNumber,
      pageSize: queryInput.pageSize,
      totalCount,
    });
    res.send(blogsListOutput);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
