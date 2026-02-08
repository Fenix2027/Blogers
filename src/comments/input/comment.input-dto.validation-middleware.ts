import { body } from 'express-validator';


export const contentValidation = body('content')
  .isString()
  .withMessage('content should be string')
  .trim()
  .isLength({ min: 20, max: 300});