import { Router } from 'express';
import { idValidation } from '../../core/middlewares/validation/params-id.validation-middleware';

export const commentsRouter = Router({});


commentsRouter.put('/:id', idValidation);
commentsRouter.delete('/:id', idValidation);
commentsRouter.get('/:id', idValidation);
