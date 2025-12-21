import { Router, Request, Response } from 'express';
import { HttpStatus } from '../../core/types/http-statuses';
import { blogsCollection, postCollection } from '../../db/mongo.db';

export const testingRouter = Router({});

testingRouter.delete(
  '/all-data',
  async (req: Request, res: Response) => {
  //truncate db
  await Promise.all([
    postCollection.deleteMany(),
    blogsCollection.deleteMany(),
  ]);
  res.sendStatus(HttpStatus.NoContent);
});
