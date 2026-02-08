import { RequestWithUserId } from '../../common/types/requests';
import { IdType } from '../../common/types/id';
import { Response } from 'express';
import { HttpStatuses } from '../../common/types/httpStatuses';
import { usersQwRepository } from '../../users/infrastructure/user.query.repository';


export async function getAuthMe(req: RequestWithUserId<IdType>, res: Response)  {
  const userId = req.user?.id!;

  if (!userId) return res.sendStatus(HttpStatuses.Unauthorized);
  const me = await usersQwRepository.findById(userId);

  return res.status(HttpStatuses.Success).send(me);
}