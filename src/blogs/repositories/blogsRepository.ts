import { Blogs } from '../types/blogs';
import { db } from '../../db/mongo.db';
import { BlogsInputDto } from '../dto/blogs-input.dto';

export const blogsRepository = {
  findAll(): Blogs[] {
    return db.blogs;
  },

  findById(id: string): Blogs | null {
    return db.blogs.find((d) => d.id === id) ?? null; // Если результат поиска равно null или undefined, то вернем null.
  },

  create(newBlog: Blogs): Blogs {
    db.blogs.push(newBlog);

    return newBlog;
  },

  update(id: string, dto: BlogsInputDto): void {
    const blogs = db.blogs.find((d) => d.id === id);

    if (!blogs) {
      throw new Error('Blogs not exist');
    }

    blogs.name = dto.name;
    blogs.description = dto.description;
    blogs.websiteUrl = dto.websiteUrl;

    return;
  },

  delete(id: string): void {
    const index = db.blogs.findIndex((v) => v.id === id);

    if (index === -1) {
      throw new Error('Blogs not exist');
    }

    db.blogs.splice(index, 1);
    return;
  },
};
