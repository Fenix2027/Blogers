import { Request, Response } from 'express';
import { blogsRepository } from '../../repositories/blogsRepository';
import { mapToBlogsViewModel } from '../mappers/map-to-blogs-view-model.util';
import { HttpStatus } from '../../../core/types/http-statuses';

export async function getBlogListHandler(req: Request, res: Response) {
  try {
    const blogs = await blogsRepository.findAll();
    const blogViewModels = blogs.map(mapToBlogsViewModel);
    res.send(blogViewModels);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
