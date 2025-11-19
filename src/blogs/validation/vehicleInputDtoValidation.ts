import { BlogsInputDto } from '../dto/blogs-input.dto';
import { ValidationError } from '../types/validationError';

const URL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const vehicleInputDtoValidation = (
  data: BlogsInputDto,
): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (
    !data.name ||
    typeof data.name !== 'string' ||
    data.name.trim().length > 15
  ) {
    errors.push({ field: 'name', message: 'Invalid name' });
  }

  if (
    !data.description ||
    typeof data.description !== 'string' ||
    data.description.trim().length > 500
  ) {
    errors.push({ field: 'description', message: 'Invalid description' });
  }

  if (
    !data.websiteUrl ||
    typeof data.websiteUrl !== 'string' ||
    data.websiteUrl.trim().length < 5 ||
    data.websiteUrl.trim().length > 100 ||
    !URL_REGEX.test(data.websiteUrl)
  ) {
    errors.push({ field: 'websiteUrl', message: 'Invalid websiteUrl' });
  }

  return errors;
};
