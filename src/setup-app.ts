import express, { Express } from 'express';
import { blogsRouter } from './drivers/routers/blogsRouter';
import { testingRouter } from './testing/routers/testing.router';
import { BLOGS_PATH, POSTS_PATH, TESTING_PATH } from './core/paths/paths';
import { postsRoute } from './rides/routes/postsRoute';

export const setupApp = (app: Express) => {
  app.use(express.json());

  app.get('/', (req, res) => {
    res.status(200).send('hello world!!!');
  });

  app.use(BLOGS_PATH, blogsRouter);
  app.use(TESTING_PATH, testingRouter);
  app.use(POSTS_PATH, postsRoute);

  return app;
};
