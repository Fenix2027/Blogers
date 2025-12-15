import { BlogsInputDto } from '../../../src/blogs/application/dtos/blogs-input.dto';

export function getDriverDto(): BlogsInputDto {
  return {
    name: 'Feodor',
    description: '987-654-3210',
    websiteUrl: 'feodor@example.com',
  };
}
