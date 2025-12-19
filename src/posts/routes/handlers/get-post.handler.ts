import { Request, Response } from 'express';
import { postRepository } from '../../repositories/postRepository';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/middlewares/validation/input-validtion-result.middleware';
import { mapToPostOutputUtil } from '../mappers/mapToPostOutputUtil';

export async function getPostHandler(
  req: Request<{ id: string }>, res: Response,)
{
  try {
    const id = req.params.id;
    const post = await postService.findByIdOrFail(id);


    const postOutput = mapToPostOutputUtil(post);
    res.status(HttpStatus.Ok).send(postOutput);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
  }
}
