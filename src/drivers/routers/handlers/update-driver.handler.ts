import { Request, Response } from 'express';
import { DriverInputDto } from '../../dto/driver.input-dto';
import { HttpStatus } from '../../../core/types/http-statuses';
import { createErrorMessages } from '../../../core/utils/error.utils';
import { blogsRepository } from '../../repositories/blogsRepository';

export function updateDriverHandler(
  req: Request<{ id: string }, {}, DriverInputDto>,
  res: Response,
) {
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

  blogsRepository.update(id, req.body);
  res.sendStatus(HttpStatus.NoContent);
}
