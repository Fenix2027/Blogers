import { blogsRepository } from '../repositories/blogsRepository';
import { WithId } from 'mongodb';
import { Blog } from '../domain/blog';
import { BlogsAttributes } from './dtos/blogs.attributes';
import { BlogQueryInput } from '../routers/input/blog-query.input';

export const blogsService = {
  async findMany(
    queryDto: BlogQueryInput,
  ): Promise<{ items: WithId<Blog>[]; totalCount: number }> {
    return blogsRepository.findMany(queryDto);
  },

  async findByIdOrFail(id: string): Promise<WithId<Blog>> {
    return blogsRepository.findByIdOrFail(id);
  },

  async create(dto: BlogsAttributes): Promise<string> {
    const x = new Date();
    const newBlog: Blog = {
      name: dto.name,
      description: dto.description,
      websiteUrl: dto.websiteUrl,
      createdAt: x.toISOString(),
      isMembership: false,
    };

    return blogsRepository.create(newBlog);
  },

  async update(id: string, dto: BlogsAttributes): Promise<void> {
    await blogsRepository.update(id, dto);
    return;
  },

  async delete(id: string): Promise<void> {
    await blogsRepository.delete(id);
    return;
  },
};