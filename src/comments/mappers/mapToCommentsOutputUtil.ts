import { WithId } from 'mongodb';
import { CommentsView } from '../types/comments.view';
import { CommentsOutput } from '../types/comments.output';

export function mapToCommentsOutputUtil(
  comment: WithId<CommentsView>,
): CommentsOutput {
  return {
    id: comment._id.toString(),
    content: comment.content,
    commentatorInfo: {
      userId: comment.commentatorInfo.userId,
      userLogin: comment.commentatorInfo.userLogin,
    },
    createdAt: comment.createdAt,
  };
}
