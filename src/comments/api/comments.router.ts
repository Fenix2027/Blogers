import { Router } from 'express';
import { idValidation } from '../../core/middlewares/validation/params-id.validation-middleware';
import { deleteCommentsHandler } from '../handlers/delete-comments.handler';
import { inputValidationResultMiddleware } from '../../core/middlewares/validation/input-validtion-result.middleware';
import { getCommentHandler } from '../handlers/get-comments.handler';
import { contentValidation } from '../input/comment.input-dto.validation-middleware';
import { updatePostHandler } from '../handlers/put-comments.handler';
import { accessTokenGuard } from '../../auth/api/guards/accese.token.guard';

export const commentsRouter = Router({});

commentsRouter.put(
  '/:id',
  accessTokenGuard,
  idValidation,
  contentValidation,
  inputValidationResultMiddleware,
  updatePostHandler,
);
commentsRouter.delete(
  '/:id',
  accessTokenGuard,
  idValidation,
  inputValidationResultMiddleware,
  deleteCommentsHandler,
);
commentsRouter.get(
  '/:id',
  idValidation,
  inputValidationResultMiddleware,
  getCommentHandler,
);
