import express, { Express } from 'express';
import { blogsRouter } from './blogs/routers/blogsRouter';
import { testingRouter } from './testing/routers/testing.router';
import {
  BLOGS_PATH,
  COMMENTS_PATH,
  POSTS_PATH,
  TESTING_PATH,
} from './core/paths/paths';
import { postsRoute } from './posts/routes/postsRoute';
import { routersPaths } from './common/path/paths';
import { authRouter } from './auth/api/auth.router';
import { usersRouter } from './users/api/users.router';
import { commentsRouter } from './comments/api/comments.router';

export const setupApp = (app: Express) => {
  app.use(express.json());
  app.use(routersPaths.common, authRouter);
  app.use(routersPaths.users, usersRouter);
  app.use(BLOGS_PATH, blogsRouter);
  app.use(TESTING_PATH, testingRouter);
  app.use(POSTS_PATH, postsRoute);
  app.use(COMMENTS_PATH, commentsRouter);

  return app;
};
