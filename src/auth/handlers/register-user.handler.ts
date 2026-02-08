
import { Request, Response } from 'express';
import { authService } from '../domain/auth.service';
import { HttpStatuses } from '../../common/types/httpStatuses';
import { ResultStatus } from '../../common/types/resultCode';


export async function registerUserHandler(req: Request, res: Response) {
  const { login, password, email } = req.body;
  const result = await authService.registerUser(login, password, email);

  if (result.status !== ResultStatus.Success) {
    return res.status(HttpStatuses.BadRequest).send({
      errorsMessages: result.extensions
    });
  }

  return res.sendStatus(HttpStatuses.NoContent); // 204
}

