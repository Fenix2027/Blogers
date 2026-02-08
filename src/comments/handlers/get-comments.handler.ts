import { Request, Response } from 'express';
import { errorsHandler } from '../../core/errors/error.handler';
import { commentQueryRepository } from '../infrastructure/comment.query.repository';

export async function getCommentHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const id = req.params.id;
    const comment = await commentQueryRepository.findByIdOrFail(id);

    res.send(comment);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
