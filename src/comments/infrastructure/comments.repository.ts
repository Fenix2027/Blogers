import { ObjectId, WithId } from 'mongodb';
import { commentCollection } from '../../db/mongo.db';
import { CommentUpdateInput } from '../input/comment-update.input';
import { CommentsView } from '../types/comments.view';
import { RepositoryNotFoundError } from '../../core/errors/repository-not-found.error';

export const commentRepository = {
  async findById(id: string): Promise<WithId<CommentsView>> {
    const res = await commentCollection.findOne({ _id: new ObjectId(id) });

    if (!res) {
      throw new RepositoryNotFoundError('Comment not exist');
    }
    return res;
  },

  async delete(id: string): Promise<void> {
    const deleteResult = await commentCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (deleteResult.deletedCount < 1) {
      throw new Error('Post not exist');
    }

    return;
  },

  async create(newComment: CommentsView): Promise<string> {
    const insertResult = await commentCollection.insertOne(newComment);
    return insertResult.insertedId.toString();
  },

  async update(id: string, dto: CommentUpdateInput): Promise<void> {
    const updateResult = await commentCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          content: dto.content,
        },
      },
    );

    if (updateResult.matchedCount < 1) {
      throw new Error('Comment not exist');
    }
    return;
  },
};
