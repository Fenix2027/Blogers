import { Request, Response } from 'express';
import { postRepository } from '../../repositories/postRepository';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/middlewares/validation/input-validtion-result.middleware';
import { mapToPostViewModelUtil } from '../mappers/map-to-post-view-model.util';

export async function getPostHandler(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const post = await postRepository.findById(id);

    if (!post) {
      res
        .status(HttpStatus.NotFound)
        .send(
          createErrorMessages([{ field: 'id', message: 'Post not found' }]),
        );

      return;
    }
    const postViewModel = mapToPostViewModelUtil(post);
    res.status(HttpStatus.Ok).send(postViewModel);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
