
import { ValidationErrorType } from '../../types/validationError';
import {
  FieldValidationError,
  ValidationError,
  validationResult,
} from 'express-validator';
import { HttpStatus } from '../../types/http-statuses';
import { Request, Response, NextFunction  } from 'express';

export const createErrorMessages = (
  errors: ValidationErrorType[],
): { errorsMessages: any[] } => {
  return {
    errorsMessages: errors.map((error) => ({
      message: error.message,
      field: error.field ?? '',
    })),
  };
};

const formatValidationError = (error: ValidationError): ValidationErrorType => {

  const expressError = error as FieldValidationError;

  return {
    status: HttpStatus.BadRequest,
    field: expressError.path,
    message: expressError.msg,
  };
};

export const inputValidationResultMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    const errors = result
      .formatWith(formatValidationError)
      .array({ onlyFirstError: true });


    res.status(HttpStatus.BadRequest).json(createErrorMessages(errors));
    return;
  }

  next();
};
