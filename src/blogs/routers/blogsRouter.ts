import { Router } from 'express';
import { getBlogListHandler } from './handlers/get-blog-list.handler';
import { getBlogHandler } from './handlers/get-blog.handler';
import { createBlogHandler } from './handlers/create-blog.handler';
import { updateBlogHandler } from './handlers/update-blog.handler';
import { deleteBlogHandler } from './handlers/delete-blog.handler';
import { idValidation } from '../../core/middlewares/validation/params-id.validation-middleware';
import { inputValidationResultMiddleware } from '../../core/middlewares/validation/input-validtion-result.middleware';
import {
  blogsInputDtoValidation,
  blogsUpdateDtoValidation,
} from '../validation/blog.input-dto.validation-middlewares';
import { superAdminGuardMiddleware } from '../../auth/middlewares/super-admin.guard-middleware';
import { paginationAndSortingValidation } from '../../core/middlewares/validation/query-pagination-sorting.validation-middleware';
import { BlogSortField } from './input/blog-sort-field';
import { getBlogPostsListHandler } from './handlers/get-blog-post-list.handler';
import { PostSortField } from '../../posts/routes/input/post-sort-field';
import { createBlogPostsListHandler } from './handlers/create-blog-post-list.handler';
import { postforBlogInputDtoValidation } from '../../posts/validation/post.input-dto.validation-middleware';

export const blogsRouter = Router({});

blogsRouter
  .get(
    '',
    paginationAndSortingValidation(BlogSortField),
    inputValidationResultMiddleware,
    getBlogListHandler,
  )

  .get('/:id', idValidation, inputValidationResultMiddleware, getBlogHandler)

  .post(
    '',
    superAdminGuardMiddleware,
    blogsInputDtoValidation,
    inputValidationResultMiddleware,
    createBlogHandler,
  )

  .put(
    '/:id',
    superAdminGuardMiddleware,
    idValidation,
    blogsUpdateDtoValidation,
    inputValidationResultMiddleware,
    updateBlogHandler,
  )

  .delete(
    '/:id',
    superAdminGuardMiddleware,
    idValidation,
    inputValidationResultMiddleware,
    deleteBlogHandler,
  )
  .get(
    '/:id/posts',
    idValidation,
    paginationAndSortingValidation(PostSortField),
    inputValidationResultMiddleware,
    getBlogPostsListHandler,
  )
  .post(
    '/:id/posts',
    idValidation,
    superAdminGuardMiddleware,
    postforBlogInputDtoValidation,
    inputValidationResultMiddleware,
    createBlogPostsListHandler,
  );
