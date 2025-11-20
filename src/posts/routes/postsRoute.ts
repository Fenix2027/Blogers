import { Router } from 'express';
import { inputValidationResultMiddleware } from '../../core/middlewares/validation/input-validtion-result.middleware';
import { superAdminGuardMiddleware } from '../../auth/middlewares/super-admin.guard-middleware';
import { idValidation } from '../../core/middlewares/validation/params-id.validation-middleware';
import { postInputDtoValidation } from '../validation/post.input-dto.validation-middleware';
import { createPostHandler } from './handlers/create-post.handler';
import { getPostsListHandler } from './handlers/get-posts-list.handler';
import { getPostHandler } from './handlers/get-post.handler';
import { blogsInputDtoValidation } from '../../blogs/validation/driver.input-dto.validation-middlewares';
import { updatePostHandler } from './handlers/update-post.handler';
import { deletePostHandler } from './handlers/delete-post.handler';

export const postsRoute = Router({});

postsRoute.get('', getPostsListHandler);

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
  blogsInputDtoValidation,
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
