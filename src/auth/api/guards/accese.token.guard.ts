import { NextFunction, Request, Response } from 'express';
import { jwtService } from '../../adapters/jwt.service';
import { IdType } from '../../../common/types/id';
import { HttpStatus } from '../../../core/types/http-statuses';

export const accessTokenGuard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.sendStatus(HttpStatus.Unauthorized);

  // 1. Правильно разделяем строку "Bearer <token>"
  const parts = authHeader.split(' ');

  if (parts.length !== 2) return res.sendStatus(HttpStatus.Unauthorized);

  const authType = parts[0]; // "Bearer"
  const token = parts[1];    // "eyJ..."

  // 2. Проверяем тип авторизации
  if (authType !== 'Bearer') return res.sendStatus(HttpStatus.Unauthorized);

  // 3. Верифицируем токен
  const payload = await jwtService.verifyToken(token);

  if (payload) {
    // В payload должен быть userId, который вы заложили при создании токена
    req.user = { id: payload.userId };
    return next(); // Обязательно выходим через return, чтобы не сработал код ниже
  }

  res.sendStatus(HttpStatus.Unauthorized);
};
