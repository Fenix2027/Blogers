import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { errorsHandler } from '../../../core/errors/error.handler';
import { postsService } from '../../application/posts.service';
import { postRepository } from '../../repositories/postRepository';


export async function deletePostHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const id = req.params.id;
    const post = await postRepository.findById(id);

    if (!post) {
      throw new Error('Post not exist');
    }
    await postsService.delete(id);

    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
