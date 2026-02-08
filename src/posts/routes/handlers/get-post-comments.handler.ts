import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { setDefaultSortAndPaginationIfNotExist } from '../../../core/helpers/set-default-sort-and-pagination';
import { RepositoryNotFoundError } from '../../../core/errors/repository-not-found.error';
import { errorsHandler } from '../../../core/errors/error.handler';
import { CommentQueryInput } from '../../../comments/input/comment-query.input';
import { commentQueryRepository } from '../../../comments/infrastructure/comment.query.repository';
import { mapToCommentListPaginatedOutput } from '../../../comments/mappers/mapToCommentListPaginatedOutput';

export async function getPostCommentListHandler(
  req: Request<{ id: string }, any, any, any>,
  res: Response,
) {
  try {
    const postId = req.params.id;

    const sanitizedQuery = matchedData(req, {
      locations: ['query'],
      includeOptionals: true,
    }) as CommentQueryInput;

    const queryInput = setDefaultSortAndPaginationIfNotExist(sanitizedQuery);

    const result = await commentQueryRepository.findCommentsByPost(
      queryInput,
      postId,
    );

    if (!result) {
      throw new RepositoryNotFoundError('Post not found');
    }

    const { items, totalCount } = result;

    const commentListOutput = mapToCommentListPaginatedOutput(items, {
      pageNumber: queryInput.pageNumber,
      pageSize: queryInput.pageSize,
      totalCount,
    });

    res.status(200).json(commentListOutput);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}