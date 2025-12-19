import { Request, Response } from 'express';
import { postRepository } from '../../repositories/postRepository';
import { mapToPostOutputUtil } from '../mappers/mapToPostOutputUtil';
import { HttpStatus } from '../../../core/types/http-statuses';

export async function getPostsListHandler( req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const posts = await postRepository.findAll();
    const postViewModels = posts.map(mapToPostOutputUtil);
    res.send(postViewModels);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
