import { Request, Response } from 'express';
import { BlogsInputDto } from '../../dto/blogs-input.dto';
import { HttpStatus } from '../../../core/types/http-statuses';
import { Blog } from '../../types/blog';
import { blogsRepository } from '../../repositories/blogsRepository';
import { mapToBlogsViewModel } from '../mappers/map-to-blogs-view-model.util';


export async function createBlogHandler(
  req: Request<{}, {}, BlogsInputDto>,
  res: Response,
) {
  try {
    const d = new Date();
    const newBlog: Blog = {
      name: req.body.name,
      description: req.body.description,
      websiteUrl: req.body.websiteUrl,
      createdAt: d.toISOString(),
      isMembership: false,
  };
    const createdBlog =  await blogsRepository.create(newBlog);
    const blogViewModel = mapToBlogsViewModel(createdBlog);
    res.status(HttpStatus.Created).send(blogViewModel);

} catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}

