import { Request, Response } from 'express';
import { PostInputDto } from '../../dto/post-input.dto';
import { blogsRepository } from '../../../blogs/repositories/blogsRepository';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/middlewares/validation/input-validtion-result.middleware';
import { postRepository } from '../../repositories/postRepository';
import { Post } from '../../types/post';
import { mapToPostViewModelUtil } from '../mappers/map-to-post-view-model.util';

export async function createPostHandler(
  req: Request<{}, {}, PostInputDto>,
  res: Response,
) {
  const postId = req.body.blogId;

  const posts = await blogsRepository.findById(postId);

  if (!posts) {
    res
      .status(HttpStatus.BadRequest)
      .send(createErrorMessages([{ field: 'id', message: 'Post not found' }]));

    return;
  }
  try {
    const d = new Date();
    const newPost: Post = {
      title: req.body.title,
      blogId: req.body.blogId,
      blogName: posts.name,
      shortDescription: req.body.shortDescription,
      content: req.body.content,
      createdAt: d.toISOString(),
    };

    const createdPost = await postRepository.create(newPost);
    const rideViewModel = mapToPostViewModelUtil(createdPost);

    res.status(HttpStatus.Created).send(rideViewModel);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
