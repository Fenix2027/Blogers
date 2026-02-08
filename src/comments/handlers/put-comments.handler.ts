import { Request, Response } from 'express';
import { HttpStatus } from '../../core/types/http-statuses';
import { errorsHandler } from '../../core/errors/error.handler';
import { CommentUpdateInput } from '../input/comment-update.input';
import { commentService } from '../domain/comment.service';
import { commentQueryRepository } from '../infrastructure/comment.query.repository';

export async function updatePostHandler(
  req: Request<{ id: string }, {}, CommentUpdateInput>,
  res: Response,
) {
  try {
    const userId = req.user!.id;
    const id = req.params.id;

    // 1 найти коммент по айди
    const comment = await commentQueryRepository.findByIdOrFail(id);
    // 2. Проверить, что userId из коммента = userId того, кто пришел
    if (comment.commentatorInfo.userId !== userId) {
      return res.sendStatus(HttpStatus.Forbidden);
    }
    // 3. Если всё ок — обновляем
    await commentService.update(id, req.body);

    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
