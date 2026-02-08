import { body } from 'express-validator';

export const codeValidation = body('code')
  .isString()
  .trim()
  .matches(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
  )
  .withMessage('Code must be a valid UUID');