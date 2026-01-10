import { WithId } from 'mongodb';
import { postRepository } from '../repositories/postRepository';
import { PostQueryInput } from '../routes/input/post-query.input';
import { Post } from '../domain/post';
import { PostAttributes } from './dtos/post-attributes';
import { blogsCollection } from '../../db/mongo.db';
import { blogsRepository } from '../../blogs/repositories/blogsRepository';
import { PostUpdateInput } from '../routes/input/post-update.input';
import { PaginationAndSorting } from '../../core/types/pagination-and-sorting';

export const postsService = {
  async findMany(
    queryDto: PostQueryInput,
  ): Promise<{ items: WithId<Post>[]; totalCount: number }> {
    return postRepository.findMany(queryDto);
  },

  async findByIdOrFail(id: string): Promise<WithId<Post>> {
    return postRepository.findByIdOrFail(id);
  },

  async createPost(dto: PostAttributes, id: any): Promise<string> {
    const blog = await blogsRepository.findByIdOrFail(id);
    const x = new Date();
    const newPost: Post = {
      title: dto.title,
      shortDescription: dto.shortDescription,
      content: dto.content,
      createdAt: x.toISOString(),
      blogId: blog._id.toString(),
      blogName: blog.name,
    };

    return postRepository.create(newPost);
  },

  async create(dto: PostAttributes): Promise<string> {
    const blog = await blogsRepository.findByIdOrFail(dto.blogId);
    const x = new Date();
    const newPost: Post = {
      title: dto.title,
      shortDescription: dto.shortDescription,
      content: dto.content,
      createdAt: x.toISOString(),
      blogId: blog._id.toString(),
      blogName: blog.name,
    };

    return postRepository.create(newPost);
  },

  async findPostsByBlog(
    queryDto: PostQueryInput,
    id: string,
  ): Promise<{ items: WithId<Post>[]; totalCount: number }> {
    await blogsRepository.findByIdOrFail(id);

    return postRepository.findPostsByBlog(queryDto, id);
  },

  async update(id: string, dto: PostUpdateInput): Promise<void> {
    await postRepository.update(id, dto);
    return;
  },

  async delete(id: string): Promise<void> {
    await postRepository.delete(id);
    return;
  },
};