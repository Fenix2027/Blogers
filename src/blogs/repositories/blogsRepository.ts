import { Blog } from '../types/blog';
import { blogsCollection } from '../../db/mongo.db';
import { ObjectId, WithId } from 'mongodb';
import { BlogsInputDto } from '../dto/blogs-input.dto';

export const blogsRepository = {
  async findAll(): Promise<WithId<Blog>[]> {
    return blogsCollection.find().toArray();
  },

  async findById(id: string): Promise<WithId<Blog> | null> {
    return blogsCollection.findOne({ _id: new ObjectId(id) }); // Если результат поиска равно null или undefined, то вернем null.
  },

  async create(newBlog: Blog): Promise<WithId<Blog>> {
    const insertResult = await blogsCollection.insertOne(newBlog);
    return { ...newBlog, _id: insertResult.insertedId };
  },

  async update(id: string, dto: BlogsInputDto): Promise<void> {
    const updateResult = await blogsCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          name: dto.name,
          description: dto.description,
          websiteUrl: dto.websiteUrl,
        },
      },
    );

    if (updateResult.matchedCount < 1) {
      throw new Error('Blog not exist');
    }
    return;
  },

  async delete(id: string): Promise<void> {
    const deleteResult = await blogsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount < 1) {
      throw new Error('Blogs not exist');
    }

    return;
  },
};
