import { BlogsAttributes } from '../../../src/blogs/application/dtos/blogs.attributes';

export function getDriverDto(): BlogsAttributes {
  return {
    name: 'Feodor',
    description: '987-654-3210',
    websiteUrl: 'feodor@example.com',
  };
}
