import { Request, Response } from 'express';
import { authService } from '../domain/auth.service';
import { ResultStatus } from '../../common/types/resultCode';
import { HttpStatuses } from '../../common/types/httpStatuses';


export async function registrationEmailResending(req: Request, res: Response) {
  const { email } = req.body;

  const result = await authService.resendConfirmationEmail(email);

  if (result.status !== ResultStatus.Success) {
    return res.status(HttpStatuses.BadRequest).send({
      errorsMessages: result.extensions,
    });
  }
  return res.sendStatus(204);
}
