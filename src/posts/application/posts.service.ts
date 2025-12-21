import { WithId } from 'mongodb';
import { postRepository } from '../repositories/postRepository';
import { PostQueryInput } from '../routes/input/post-query.input';
import { Post } from '../domain/post';
import { PostAttributes } from './dtos/post-attributes';
import { blogsCollection } from '../../db/mongo.db';
import { blogsRepository } from '../../blogs/repositories/blogsRepository';

export const postsService = {
  async findMany(
    queryDto: PostQueryInput,
  ): Promise<{ items: WithId<Post>[]; totalCount: number }> {
    return postRepository.findMany(queryDto);
  },

  async findByIdOrFail(id: string): Promise<WithId<Post>> {
    return postRepository.findByIdOrFail(id);
  },

  async create(dto: PostAttributes): Promise<string> {
    const x = new Date();
    const blog = await blogsRepository.findByIdOrFail(dto.blogId);
    const newPost: Post = {
      title: dto.title,
      shortDescription: dto.shortDescription,
      content: dto.content,
      createdAt: x.toISOString(),
      blogId: dto.blogId,
      blogName: blog.name
    };

    return postRepository.create(newPost);
  },

  async findPostsByBlog(
    queryDto: PostQueryInput,
    driverId: string,
  ): Promise<{ items: WithId<Post>[]; totalCount: number }> {
    await blogsRepository.findByIdOrFail(driverId);

    return postRepository.findPostsByBlog(queryDto, driverId);
  },

  async update(id: string, dto: PostAttributes): Promise<void> {
    await postRepository.update(id, dto);
    return;
  },

  async delete(id: string): Promise<void> {
    await postRepository.delete(id);
    return;
  },
};