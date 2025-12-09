import { Request, Response } from 'express';
import { postRepository } from '../../repositories/postRepository';
import { mapToPostViewModelUtil } from '../mappers/map-to-post-view-model.util';
import { HttpStatus } from '../../../core/types/http-statuses';

export async function getPostsListHandler(req: Request, res: Response) {
  try {
    const posts = await postRepository.findAll();
    const postViewModels = posts.map(mapToPostViewModelUtil);
    res.send(postViewModels);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
