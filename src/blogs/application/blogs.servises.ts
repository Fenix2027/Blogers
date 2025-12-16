import { blogsRepository } from '../repositories/blogsRepository';
import { WithId } from 'mongodb';
import { Blog } from '../domain/blog';
import { postRepository } from '../../posts/repositories/postRepository';
import { DomainError } from '../../core/errors/domain.error';
import { BlogsAttributes } from './dtos/blogs.attributes';
import { DriverQueryInput } from '../routes/input/driver-query.input';


export const BlogsService = {
  async findMany(
    queryDto: DriverQueryInput,
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
    const activeRide = await postRepository.findActiveRideByDriverId(id);

    if (activeRide) {
      throw new DomainError(
        `Driver has an active ride. Complete or cancel the ride first`,
        DriverErrorCode.HasActiveRide,
      );
    }

    await blogsRepository.delete(id);
    return;
  },
};