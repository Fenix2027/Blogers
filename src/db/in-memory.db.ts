import { Blogs } from '../blogs/types/blogs';
import { Post } from '../rides/types/post';

export const db = {
  blogs: <Blogs[]>[
    {
      id: '1',
      name: 'Tom Rider',
      description: '123-456-7890',
      websiteUrl: 'tom.rider@example.com',
    },
    {
      id: '2',
      name: 'Tom Rider',
      description: '123-456-7890',
      websiteUrl: 'tom.rider@example.com',
    },
    {
      id: '3',
      name: 'Tom Rider',
      description: '123-456-7890',
      websiteUrl: 'tom.rider@example.com',
    },
  ],
  posts: <Post[]>[],
};
