import { Request, Response } from 'express';
import { PostInputDto } from '../../dto/post-input.dto';
import { blogsRepository } from '../../../blogs/repositories/blogsRepository';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/middlewares/validation/input-validtion-result.middleware';
import { postRepository } from '../../repositories/postRepository';
import { Post } from '../../types/post';
import { db } from '../../../db/in-memory.db';

export function createPostHandler(
  req: Request<{}, {}, PostInputDto>,
  res: Response,
) {
  const postId = req.body.blogId;

  const posts = blogsRepository.findById(postId);

  if (!posts) {
    res
      .status(HttpStatus.BadRequest)
      .send(createErrorMessages([{ field: 'id', message: 'Post not found' }]));

    return;
  }
  const newPost: Post = {
    id: String(db.posts.length ? db.posts[db.posts.length - 1].id + 1 : 1),
    title: req.body.title,
    blogId: req.body.blogId,
    blogName: posts.name,
    shortDescription: req.body.shortDescription,
    content: req.body.content,
  };

  postRepository.createRide(newPost);

  res.status(HttpStatus.Created).send(newPost);
}
