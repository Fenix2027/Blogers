import { Blogs } from '../blogs/types/blogs';
import { Ride } from '../rides/types/ride';

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
  rides: <Ride[]>[],
};
