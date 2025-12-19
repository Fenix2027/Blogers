import { body } from 'express-validator';
import { resourceTypeValidation } from '../../core/middlewares/validation/resource-type.validation-middleware';
import { ResourceType } from '../../core/types/resource-type';

const nameValidation = body('name')
  .isString()
  .withMessage('name should be string')
  .trim()
  .isLength({ min: 1, max: 15 })
  .withMessage('Length of name is not correct');

const descriptionValidation = body('description')
  .isString()
  .withMessage('description should be string')
  .trim()
  .isLength({ min: 1, max: 500 })
  .withMessage('Length of description is not correct');

const websiteUrlValidation = body('websiteUrl')
  .isString()
  .withMessage('websiteUrl should be string')
  .trim()
  .isLength({ max: 100 })
  .withMessage('websiteUrl of email is not correct')
  .isURL();

export const blogsInputDtoValidation = [
  resourceTypeValidation(ResourceType.Blogs),
  nameValidation,
  descriptionValidation,
  websiteUrlValidation,
];
