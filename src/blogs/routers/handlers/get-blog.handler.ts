import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsService } from '../../application/blogs.servises';
import { errorsHandler } from '../../../core/errors/error.handler';
import { mapToBlogsOutput } from '../mappers/map-to-blog-output.util';

export async function getBlogHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const id = req.params.id;
    const blog = await blogsService.findByIdOrFail(id);

    const blogOutput = mapToBlogsOutput(blog);

    res.status(HttpStatus.Ok).send(blogOutput);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
