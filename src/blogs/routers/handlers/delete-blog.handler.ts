import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsService } from '../../application/blogs.servises';
import { errorsHandler } from '../../../core/errors/error.handler';
import { blogsRepository } from '../../repositories/blogsRepository';

export async function deleteBlogHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const id = req.params.id;
    const blog = await blogsRepository.findById(id);

    if (!blog) {
          throw new Error('Blogs not exist')
    }
    await blogsService.delete(id);

    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
