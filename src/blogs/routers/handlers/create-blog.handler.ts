import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { mapToBlogsOutput } from '../mappers/map-to-blog-output.util';
import { blogsService } from '../../application/blogs.servises';
import { errorsHandler } from '../../../core/errors/error.handler';
import { BlogsAttributes } from '../../application/dtos/blogs.attributes';

export async function createBlogHandler(
  req: Request<{}, {}, BlogsAttributes>,
  res: Response,
) {
  try {
    const createdBlogId = await blogsService.create(req.body);

    const createdBlog = await blogsService.findByIdOrFail(createdBlogId);

    const blogViewModel = mapToBlogsOutput(createdBlog);

    res.status(HttpStatus.Created).send(blogViewModel);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
