import { Response } from 'express';
import { RepositoryNotFoundError } from './repository-not-found.error';
import { HttpStatus } from '../types/http-statuses';
import { DomainError } from './domain.error';

export function errorsHandler(error: unknown, res: Response): void {
  const err = error as any;
  const errorMessage = err?.message || '';

  // Проверяем по типу класса ИЛИ по ключевым словам в сообщении (для надежности)
  if (
    error instanceof RepositoryNotFoundError ||
    err?.name === 'RepositoryNotFoundError' ||
    errorMessage.includes('not exist') ||
    errorMessage.includes('not found')
  ) {
    res.status(404).json({
      errorsMessages: [{ message: errorMessage || 'Resource not found', field: 'id' }]
    });
    return;
  }

  // Обработка ошибок формата MongoDB ObjectId (CastError/BSONError)
  if (err?.name === 'BSONError' || err?.name === 'CastError' || err?.kind === 'ObjectId') {
    res.status(404).json({
      errorsMessages: [{ message: 'Resource not found', field: 'id' }]
    });
    return;
  }

  // Если DomainError (400)
  if (error instanceof DomainError) {
    res.status(400).json({
      errorsMessages: [{ message: err.message, field: err.source || 'unknown' }]
    });
    return;
  }

  // Критическая ошибка (теперь с JSON телом, чтобы тест не висел)
  res.status(500).json({
    errorsMessages: [{ message: errorMessage || 'Internal Server Error', field: 'server' }]
  });
}