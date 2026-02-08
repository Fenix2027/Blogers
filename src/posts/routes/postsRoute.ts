import { Router } from 'express';
import { inputValidationResultMiddleware } from '../../core/middlewares/validation/input-validtion-result.middleware';
import { superAdminGuardMiddleware } from '../../auth/middlewares/super-admin.guard-middleware';
import { idValidation } from '../../core/middlewares/validation/params-id.validation-middleware';
import { postInputDtoValidation } from '../validation/post.input-dto.validation-middleware';
import { createPostHandler } from './handlers/create-post.handler';
import { getPostListHandler } from './handlers/get-posts-list.handler';
import { getPostHandler } from './handlers/get-post.handler';
import { updatePostHandler } from './handlers/update-post.handler';
import { deletePostHandler } from './handlers/delete-post.handler';
import { paginationAndSortingValidation } from '../../core/middlewares/validation/query-pagination-sorting.validation-middleware';
import { PostSortField } from './input/post-sort-field';
import { accessTokenGuard } from '../../auth/api/guards/accese.token.guard';
import { getPostCommentListHandler } from './handlers/get-post-comments.handler';
import { CommentSortField } from '../../comments/input/comment-sort-field';
import { contentValidation } from '../../comments/input/comment.input-dto.validation-middleware';
import { createPostCommentsListHandler } from './handlers/create-post-comments-list.handler';

export const postsRoute = Router({});

postsRoute.get(
  '',
  paginationAndSortingValidation(PostSortField),
  inputValidationResultMiddleware,
  getPostListHandler,
);

postsRoute.get(
  '/:id',
  idValidation,
  inputValidationResultMiddleware,
  getPostHandler,
);

postsRoute.post(
  '',
  superAdminGuardMiddleware,
  postInputDtoValidation,
  inputValidationResultMiddleware,
  createPostHandler,
);
postsRoute.put(
  '/:id',
  superAdminGuardMiddleware,
  idValidation,
  postInputDtoValidation,
  inputValidationResultMiddleware,
  updatePostHandler,
);

postsRoute.delete(
  '/:id',
  superAdminGuardMiddleware,
  idValidation,
  inputValidationResultMiddleware,
  deletePostHandler,
);
postsRoute.get(
  '/:id/comments',
  idValidation,
  paginationAndSortingValidation(CommentSortField),
  inputValidationResultMiddleware,
  getPostCommentListHandler,
);
postsRoute.post(
  '/:id/comments',
  idValidation,
  accessTokenGuard,
  contentValidation,
  inputValidationResultMiddleware,
  createPostCommentsListHandler,
);
