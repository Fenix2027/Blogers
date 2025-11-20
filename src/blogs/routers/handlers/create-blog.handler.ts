import { Request, Response } from 'express';
import { BlogsInputDto } from '../../dto/blogs-input.dto';
import { HttpStatus } from '../../../core/types/http-statuses';
import { db } from '../../../db/in-memory.db';
import { Blogs } from '../../types/blogs';
import { blogsRepository } from '../../repositories/blogsRepository';

export function createBlogHandler(
  req: Request<{}, {}, BlogsInputDto>,
  res: Response,
) {
  const newBlog: Blogs = {
    id: String(db.blogs.length ? db.blogs[db.blogs.length - 1].id + 1 : 1),
    name: req.body.name,
    description: req.body.description,
    websiteUrl: req.body.websiteUrl,
  };

  blogsRepository.create(newBlog);
  res.status(HttpStatus.Created).send(newBlog);
}
