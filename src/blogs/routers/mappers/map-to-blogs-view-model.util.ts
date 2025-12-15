import { WithId } from 'mongodb';
import { Blog } from '../../domain/blog';
import { BlogsViewModel } from '../../types/blogs-view-model';

export function mapToBlogsViewModel(blog: WithId<Blog>): BlogsViewModel {
  return {
    id: blog._id.toString(),
    name: blog.name,
    description: blog.description,
    websiteUrl: blog.websiteUrl,
    createdAt: blog.createdAt,
    isMembership: blog.isMembership,
  };
}
