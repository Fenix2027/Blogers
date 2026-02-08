import { CommentsOutput } from './comments.output';

export type CommentListPaginatedOutput = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: CommentsOutput[];
};