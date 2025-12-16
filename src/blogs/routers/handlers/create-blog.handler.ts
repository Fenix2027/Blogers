import { Request, Response } from 'express';
import { BlogsAttributes } from '../../application/dtos/blogs.attributes';
import { HttpStatus } from '../../../core/types/http-statuses';
import { Blog } from '../../domain/blog';
import { blogsRepository } from '../../repositories/blogsRepository';
import { mapToBlogsViewModel } from '../mappers/map-to-blogs-view-model.util';


export async function createBlogHandler(
  req: Request<{}, {}, BlogsAttributes>,
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

