import { PostAttributes } from '../../../src/posts/application/dtos/post-attributes';

export function getRideDto(blogId: string): PostAttributes {
  return {
    content: '',
    blogId,
    title: 'Bob',
    shortDescription: '123 Main St, Springfield, IL',
  };
}
