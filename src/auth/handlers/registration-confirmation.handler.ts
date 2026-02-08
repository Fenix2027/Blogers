import { Request, Response } from 'express';
import { authService } from '../domain/auth.service';
import { HttpStatuses } from '../../common/types/httpStatuses';
import { ResultStatus } from '../../common/types/resultCode';

export async function registrationConfirmation(req: Request, res: Response) {
  const { code } = req.body;
  const result = await authService.confirmEmail(code);

  if (result.status !== ResultStatus.Success) {
    return res
      .status(HttpStatuses.BadRequest)
      .send({ errorsMessages: result.extensions });
  }
  return res.sendStatus(HttpStatuses.NoContent); // 204
}