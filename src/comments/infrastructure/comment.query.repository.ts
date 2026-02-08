import { ObjectId, WithId } from 'mongodb';
import { commentCollection } from '../../db/mongo.db';
import { RepositoryNotFoundError } from '../../core/errors/repository-not-found.error';
import { CommentsView } from '../types/comments.view';
import { postRepository } from '../../posts/repositories/postRepository';
import { CommentQueryInput } from '../input/comment-query.input';
import { mapToCommentsOutputUtil } from '../mappers/mapToCommentsOutputUtil';
import { CommentsOutput } from '../types/comments.output';

export const commentQueryRepository = {
  async findById(id: string): Promise<WithId<CommentsView> | null> {
    return commentCollection.findOne({ _id: new ObjectId(id) });



  },

  async findByIdOrFail(id: string): Promise<CommentsOutput> {
    const res = await commentCollection.findOne({ _id: new ObjectId(id) });

    if (!res) {
      throw new RepositoryNotFoundError('Comment not exist');
    }

    return  mapToCommentsOutputUtil(res);
  },
  async findCommentsByPost(
    queryDto: CommentQueryInput,
    id: string,
  ): Promise<{ items: WithId<CommentsView>[]; totalCount: number }> {
    await postRepository.findByIdOrFail(id);

    return commentQueryRepository.findCommentByPost(queryDto, id);
  },
  async findCommentByPost(
    queryDto: CommentQueryInput,
    postId: string,
  ): Promise<{ items: WithId<CommentsView>[]; totalCount: number }> {
    const { pageNumber, pageSize, sortBy, sortDirection } = queryDto;
    const filter = { postId: postId };
    const skip = (pageNumber - 1) * pageSize;

    const [items, totalCount] = await Promise.all([
      commentCollection
        .find(filter)
        .sort({ [sortBy]: sortDirection })
        .skip(skip)
        .limit(pageSize)
        .toArray(),
      commentCollection.countDocuments(filter),
    ]);
    return { items, totalCount };
  },
};