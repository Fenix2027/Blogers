import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const inputValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // 1. Используем formatWith для преобразования ошибок в нужный нам формат
  const result = validationResult(req).formatWith((error) => {
    // В express-validator v7+ ошибки — это Union тип.
    // Проверяем, что ошибка относится к конкретному полю (тип 'field')
    if (error.type === 'field') {
      return {
        message: error.msg,
        field: error.path, // Раньше это было 'param', теперь 'path'
      };
    }

    // Для остальных типов ошибок (alternative, unknown_fields и т.д.)
    return {
      message: error.msg,
      field: 'unknown',
    };
  });

  if (!result.isEmpty()) {
    // 2. Убираем return перед res.status (исправляет ошибку TS2769),
    // так как Express ожидает void или Promise<void>
    res.status(400).send({
      // onlyFirstError: true вернет только одну ошибку для каждого поля
      errorsMessages: result.array({ onlyFirstError: true }),
    });
    return; // Просто прерываем выполнение функции
  }

  // 3. Если ошибок нет, передаем управление дальше
  next();
};
