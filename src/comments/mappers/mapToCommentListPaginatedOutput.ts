import { CommentsView } from '../types/comments.view';
import { WithId } from 'mongodb';
import { CommentListPaginatedOutput } from '../types/CommentListPaginateOutput';
import { CommentsOutput } from '../types/comments.output';

export function mapToCommentListPaginatedOutput(
  comment: WithId<CommentsView>[],
  meta: { pageNumber: number; pageSize: number; totalCount: number },
): CommentListPaginatedOutput {
  return {
    pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
    page: meta.pageNumber,
    pageSize: meta.pageSize,
    totalCount: meta.totalCount,
    items: comment.map(
      (comment): CommentsOutput => ({
        id: comment._id.toString(),
        content: comment.content,
        commentatorInfo: {
          userId: comment.commentatorInfo.userId,
          userLogin: comment.commentatorInfo.userLogin
        },
        createdAt: comment.createdAt,
      }),
    ),
  };
}