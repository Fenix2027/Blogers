import { WithId } from 'mongodb';
import { Blog } from '../../domain/blog';
import { BlogOutput } from '../output/driver.output';

export function mapToBlogsOutput(blog: WithId<Blog>): BlogOutput {
  return {
    id: blog._id.toString(),
    name: blog.name,
    description: blog.description,
    websiteUrl: blog.websiteUrl,
    createdAt: blog.createdAt,
    isMembership: blog.isMembership,
  };
}
