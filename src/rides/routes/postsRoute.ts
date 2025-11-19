import { Router } from 'express';
import { inputValidationResultMiddleware } from '../../core/middlewares/validation/input-validtion-result.middleware';
import { superAdminGuardMiddleware } from '../../auth/middlewares/super-admin.guard-middleware';
import { idValidation } from '../../core/middlewares/validation/params-id.validation-middleware';
import { rideInputDtoValidation } from '../validation/ride.input-dto.validation-middleware';
import { createPostHandler } from './handlers/create-post.handler';
import { getPostsListHandler } from './handlers/get-posts-list.handler';
import { getRideHandler } from './handlers/get-ride.handler';
import { blogsInputDtoValidation } from '../../blogs/validation/driver.input-dto.validation-middlewares';
import { updateBlogHandler } from '../../blogs/routers/handlers/update-blog.handler';
import { deleteBlogHandler } from '../../blogs/routers/handlers/delete-blog.handler';

export const postsRoute = Router({});

postsRoute.use();

postsRoute.get('', getPostsListHandler);

postsRoute.get(
  '/:id',
  idValidation,
  inputValidationResultMiddleware,
  getRideHandler,
);

postsRoute.post(
  '',
  superAdminGuardMiddleware,
  rideInputDtoValidation,
  inputValidationResultMiddleware,
  createPostHandler,
);
postsRoute.put(
  '/:id',
  superAdminGuardMiddleware,
  idValidation,
  blogsInputDtoValidation,
  inputValidationResultMiddleware,
  updateBlogHandler,
);

postsRoute.delete(
  '/:id',
  superAdminGuardMiddleware,
  idValidation,
  inputValidationResultMiddleware,
  deleteBlogHandler,
);
