import { RequestWithBody } from '../../common/types/requests';
import { LoginDto } from '../types/login.dto';
import { authService } from '../domain/auth.service';
import { ResultStatus } from '../../common/types/resultCode';
import { Response } from 'express';
import { HttpStatuses } from '../../common/types/httpStatuses';
import { resultCodeToHttpException } from '../../common/result/resultCodeToHttpException';

export async function createAuthHandler(
  req: RequestWithBody<LoginDto>,
  res: Response,
) {
  try {
    const { loginOrEmail, password } = req.body;
    const result = await authService.loginUser(loginOrEmail, password);

    if (result.status === ResultStatus.Unauthorized) {
      return res.sendStatus(HttpStatuses.Unauthorized); // Четко возвращаем 401
    }

    if (result.status !== ResultStatus.Success) {
      // Если другие ошибки, используем маппер
      return res
        .status(resultCodeToHttpException(result.status))
        .send(result.extensions);
    }
    // 2. Устанавливаем Refresh Token в Cookie
    // Это важно: клиент (браузер) будет сам прикреплять эту куку к следующим запросам
    res.cookie('refreshToken', result.data!.refreshToken, {
      httpOnly: true, // Защита от XSS (JS не сможет прочитать куку)
      secure: true,   // Отправка только по HTTPS (для продакшена)
    });

    return res
      .status(HttpStatuses.Success)
      .send({ accessToken: result.data!.accessToken });
  } catch (e) {
    console.error(e);
    return res.sendStatus(HttpStatuses.ServerError);
  }
}