import { Post } from '../types/post';
import { db } from '../../db/in-memory.db';

export const postRepository = {
  findAll(): Post[] {
    return db.posts;
  },

  findById(id: string): Post | null {
    return db.posts.find((d) => d.id === id) ?? null;
  },

  createRide(newPost: Post): Post {
    db.posts.push(newPost);

    return newPost;
  },
};
