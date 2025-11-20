import { PostInputDto } from '../../../src/posts/dto/post-input.dto';

export function getRideDto(blogId: string): PostInputDto {
  return {
    content: '',
    blogId,
    title: 'Bob',
    shortDescription: '123 Main St, Springfield, IL',
  };
}
