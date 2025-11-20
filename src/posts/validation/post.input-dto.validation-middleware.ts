import { body } from 'express-validator';

export const titleValidation = body('title')
  .isString()
  .withMessage('title should be string')
  .trim()
  .isLength({ min: 1, max: 30 });

export const blogIdValidation = body('blogId')
  .isString()
  .withMessage('blogId should be string')
  .trim();

export const shortDescriptionValidation = body('shortDescription')
  .isString()
  .withMessage('shortDescription should be string')
  .trim()
  .isLength({ min: 1, max: 100 });

export const contentValidation = body('content')
  .isString()
  .withMessage('content should be string')
  .trim()
  .isLength({ min: 1, max: 1000 });

export const postInputDtoValidation = [
  titleValidation,
  blogIdValidation,
  shortDescriptionValidation,
  contentValidation,
];
