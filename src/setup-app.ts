import express, { Express } from 'express';
import { blogsRouter } from './blogs/routers/blogsRouter';
import { testingRouter } from './testing/routers/testing.router';
import { BLOGS_PATH, POSTS_PATH, TESTING_PATH } from './core/paths/paths';
import { postsRoute } from './posts/routes/postsRoute';

export const setupApp = (app: Express) => {
  app.use(express.json());

  app.use(BLOGS_PATH, blogsRouter);
  app.use(TESTING_PATH, testingRouter);
  app.use(POSTS_PATH, postsRoute);

  return app;
};
