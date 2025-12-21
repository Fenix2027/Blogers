import { Post } from '../domain/post';
import { postCollection } from '../../db/mongo.db';
import { PostAttributes } from '../application/dtos/post-attributes';
import { ObjectId, WithId } from 'mongodb';
import { PostQueryInput } from '../routes/input/post-query.input';
import { RepositoryNotFoundError } from '../../core/errors/repository-not-found.error';

export const postRepository = {
  async findMany(
    queryDto: PostQueryInput,
  ): Promise<{ items: WithId<Post>[]; totalCount: number }> {
    const {
      pageNumber,
      pageSize,
      sortBy,
      sortDirection,
      searchPostCreatedAtTerm,
    } = queryDto;

    const skip = (pageNumber - 1) * pageSize;
    const filter: any = {};

    if (searchPostCreatedAtTerm) {
      filter.createdAt = { $regex: searchPostCreatedAtTerm, $options: 'i' };
    }

    const [items, totalCount] = await Promise.all([
      postCollection
        .find(filter)
        .sort({ [sortBy]: sortDirection })
        .skip(skip)
        .limit(pageSize)
        .toArray(),
      postCollection.countDocuments(filter),
    ]);
    return { items, totalCount };
  },

  async findById(id: string): Promise<WithId<Post> | null> {
    return postCollection.findOne({ _id: new ObjectId(id) });
  },
  async findByIdOrFail(id: string): Promise<WithId<Post>> {
    const res = await postCollection.findOne({ _id: new ObjectId(id) });

    if (!res) {
      throw new RepositoryNotFoundError('Post not exist');
    }
    return res;
  },

  async create(newPost: Post): Promise<string> {
    const insertResult = await postCollection.insertOne(newPost);
    return insertResult.insertedId.toString();
  },

  async findPostsByBlog(
    queryDto: PostQueryInput,
    blogId: string,
  ): Promise<{ items: WithId<Post>[]; totalCount: number }> {
    const { pageNumber, pageSize, sortBy, sortDirection } = queryDto;
    const filter = { 'Blog.id': blogId };
    const skip = (pageNumber - 1) * pageSize;

    const [items, totalCount] = await Promise.all([
      postCollection
        .find(filter)
        .sort({ [sortBy]: sortDirection })
        .skip(skip)
        .limit(pageSize)
        .toArray(),
      postCollection.countDocuments(filter),
    ]);
    return { items, totalCount };
  },

  async update(id: string, dto: PostAttributes): Promise<void> {
    const updateResult = await postCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          title: dto.title,
          shortDescription: dto.shortDescription,
          content: dto.content,
          blogId: dto.blogId,
        },
      },
    );

    if (updateResult.matchedCount < 1) {
      throw new Error('Blog not exist');
    }
    return;
  },

  async delete(id: string): Promise<void> {
    const deleteResult = await postCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount < 1) {
      throw new Error('Post not exist');
    }

    return;
  },
};
