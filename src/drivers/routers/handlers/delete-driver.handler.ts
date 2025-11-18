import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { blogsRepository } from '../../repositories/blogsRepository';

export function deleteDriverHandler(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const driver = blogsRepository.findById(id);

  if (!driver) {
    res
      .status(HttpStatus.NotFound)
      .send(
        createErrorMessages([{ field: 'id', message: 'Vehicle not found' }]),
      );
    return;
  }

  blogsRepository.delete(id);
  res.sendStatus(HttpStatus.NoContent);
}
