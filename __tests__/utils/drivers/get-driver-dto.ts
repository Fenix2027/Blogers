import { BlogsInputDto } from '../../../src/blogs/dto/blogs-input.dto';

export function getDriverDto(): BlogsInputDto {
  return {
    name: 'Feodor',
    description: '987-654-3210',
    websiteUrl: 'feodor@example.com',
  };
}
