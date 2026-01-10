import { Router, Request, Response } from 'express';
import { HttpStatus } from '../../core/types/http-statuses';
// Импортируем все коллекции, которые нужно очистить
import { blogsCollection, postCollection, usersCollection } from '../../db/mongo.db';

export const testingRouter = Router({});

testingRouter.delete(
  '/all-data',
  async (req: Request, res: Response) => {
    try {
      // Удаляем данные из всех существующих коллекций одновременно
      await Promise.all([
        postCollection.deleteMany({}),
        blogsCollection.deleteMany({}),
        usersCollection.deleteMany({}), // Добавили удаление пользователей
      ]);

      res.sendStatus(HttpStatus.NoContent); // 204
    } catch (e) {
      console.error('Error in testing/all-data:', e);
      res.sendStatus(500);
    }
  }
);
