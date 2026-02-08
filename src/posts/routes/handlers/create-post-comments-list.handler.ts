import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { errorsHandler } from '../../../core/errors/error.handler';
import { CommentInput } from '../../../comments/input/commentInput';
import { commentQueryRepository } from '../../../comments/infrastructure/comment.query.repository';
import { commentService } from '../../../comments/domain/comment.service';
import { postRepository } from '../../repositories/postRepository';

export async function createPostCommentsListHandler(
  req: Request<{ id: string }, {}, CommentInput>,
  res: Response,
) {
  try {
    const postId = req.params.id;

    // 1. ПРОВЕРКА: Существует ли пост?
    // Нужно импортировать postsRepository или использовать метод findById
    const post = await postRepository.findById(postId);

    if (!post) {
      return res.sendStatus(HttpStatus.NotFound); // Вернет 404
    }

    // 2. Если пост найден, продолжаем создание комментария
    // Не забудьте передать userId из req.user!.id, если ваш сервис это требует
    const createCommentId = await commentService.createComment(
      req.body.content,
      postId,
      req.user!.id,
    );

    const createdComment =
      await commentQueryRepository.findByIdOrFail(createCommentId);

    res.status(HttpStatus.Created).send(createdComment);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}