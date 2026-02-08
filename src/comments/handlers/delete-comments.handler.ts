import { Request, Response } from 'express';
import { HttpStatus } from '../../core/types/http-statuses';
import { errorsHandler } from '../../core/errors/error.handler';
import { commentService } from '../domain/comment.service';

export async function deleteCommentsHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const id = req.params.id;
    const userId = req.user!.id;
    const comment = await commentService.findByIdOrFail(id);
    if (comment.commentatorInfo.userId !== userId) {
      return res.sendStatus(HttpStatus.Forbidden);
    }
    await commentService.delete(id);

    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
