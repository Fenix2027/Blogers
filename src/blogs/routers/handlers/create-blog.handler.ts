import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { mapToBlogsOutput } from '../mappers/map-to-blog-output.util';
import { BlogCreateInput } from '../input/blog-create.input';
import { blogsService } from '../../application/blogs.servises';
import { errorsHandler } from '../../../core/errors/error.handler';

export async function createBlogHandler(
  req: Request<{}, {}, BlogCreateInput>,
  res: Response,
) {
  try {
    const createdBlogId = await blogsService.create(req.body.data.attributes);

    const createdBlog = await blogsService.findByIdOrFail(createdBlogId);

    const blogViewModel = mapToBlogsOutput(createdBlog);

    res.status(HttpStatus.Created).send(blogViewModel);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
