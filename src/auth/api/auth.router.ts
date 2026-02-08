import { Router } from 'express';
import { routersPaths } from '../../common/path/paths';
import { passwordValidation } from '../../users/api/middlewares/password.validation';
import { inputValidation } from '../../common/validation/input.validation';
import { loginOrEmailValidation } from '../../users/api/middlewares/login.or.email.validation';
import { accessTokenGuard } from './guards/accese.token.guard';
import { createAuthHandler } from '../handlers/create-auth.handler';
import { getAuthMe } from '../handlers/get-auth-me.handler';
import { registerUserHandler } from '../handlers/register-user.handler';
import { registrationConfirmation } from '../handlers/registration-confirmation.handler';
import { registrationEmailResending } from '../handlers/registration-email-resending.handler';
import { codeValidation } from '../middlewares/validation/codevalidation';
import { loginValidation } from '../../users/api/middlewares/login.validation';
import { emailValidation } from '../../users/api/middlewares/email.validation';

export const authRouter = Router();

authRouter.post(
  routersPaths.auth.login,
  passwordValidation,
  loginOrEmailValidation,
  inputValidation,
  createAuthHandler,
);

authRouter.get(routersPaths.auth.me, accessTokenGuard, getAuthMe);

authRouter.post(
  routersPaths.auth.registration,
  passwordValidation,
  loginValidation,
  emailValidation,
  inputValidation,
  registerUserHandler,
  )

authRouter.post(
  routersPaths.auth.registrationConfirmation,
  inputValidation,
  codeValidation,
  registrationConfirmation)

authRouter.post(
  routersPaths.auth.registrationEmailResending,
  inputValidation,
  registrationEmailResending
)