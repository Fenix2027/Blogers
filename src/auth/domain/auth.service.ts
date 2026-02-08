import { bcryptService } from '../adapters/bcrypt.service';
import { usersRepository } from '../../users/infrastructure/user.repository';
import { ResultStatus } from '../../common/types/resultCode';
import { jwtService } from '../adapters/jwt.service';
import { WithId } from 'mongodb';
import { IUserDB } from '../../users/types/user.db.interface';
import { Result } from '../../common/result/result.type';
import { nodemailerService } from '../adapters/nodemailer.service';
import { User } from '../../users/domain/user';
import { emailExamples } from '../adapters/emailExamples';

export const authService = {
  async loginUser(
    loginOrEmail: string,
    password: string,
  ): Promise<Result<{ accessToken: string } | null>> {
    const result = await this.checkUserCredentials(loginOrEmail, password);
    //TODO replace with helper function
    if (result.status !== ResultStatus.Success)
      return {
        status: ResultStatus.Unauthorized,
        errorMessage: 'Unauthorized',
        extensions: [{ field: 'loginOrEmail', message: 'Wrong credentials' }],
        data: null,
      };

    const accessToken = await jwtService.createToken(
      result.data!._id.toString(),
    );

    return {
      status: ResultStatus.Success,
      data: { accessToken },
      extensions: [],
    };
  },

  async checkUserCredentials(
    loginOrEmail: string,
    password: string,
  ): Promise<Result<WithId<IUserDB> | null>> {
    const user = await usersRepository.findByLoginOrEmail(loginOrEmail);
    if (!user)
      return {
        status: ResultStatus.NotFound,
        data: null,
        errorMessage: 'Not Found',
        extensions: [{ field: 'loginOrEmail', message: 'Not Found' }],
      };

    const isPassCorrect = await bcryptService.checkPassword(
      password,
      user.passwordHash,
    );
    if (!isPassCorrect)
      return {
        status: ResultStatus.BadRequest,
        data: null,
        errorMessage: 'Bad Request',
        extensions: [{ field: 'password', message: 'Wrong password' }],
      };

    return {
      status: ResultStatus.Success,
      data: user,
      extensions: [],
    };
  },

  async registerUser(
    login: string,
    pass: string,
    email: string,
  ): Promise<Result<User | null>> {

    const loginExist = await usersRepository.doesExistByLoginOrEmail(
      login,
      email,
    );
    if (loginExist)
      return {
        status: ResultStatus.BadRequest,
        data: null,
        extensions: [{ field: 'login', message: 'Login already exists' }],
      };


    const passwordHash = await bcryptService.generateHash(pass);
    const newUser = new User(login, email, passwordHash);

    await usersRepository.create(newUser);

    nodemailerService
      .sendEmail(
        newUser.email,
        newUser.emailConfirmation.confirmationCode,
        emailExamples.registrationEmail,
      )
      .catch((e) => console.error(e));

    return { status: ResultStatus.Success, data: newUser, extensions: [] };
  },

  async confirmEmail(code: string): Promise<Result<boolean>> {
    const user = await usersRepository.findByConfirmationCode(code);

    if (!user)
      return {
        status: ResultStatus.BadRequest,
        data: false,
        extensions: [{ field: 'code', message: 'Incorrect code' }],
      };

    if (user.emailConfirmation.isConfirmed)
      return {
        status: ResultStatus.BadRequest,
        data: false,
        extensions: [{ field: 'code', message: 'Already confirmed' }],
      };

    if (user.emailConfirmation.expirationDate < new Date())
      return {
        status: ResultStatus.BadRequest,
        data: false,
        extensions: [{ field: 'code', message: 'Code expired' }],
      };

    await usersRepository.updateConfirmationStatus(user._id);
    return { status: ResultStatus.Success, data: true, extensions: [] };
  },
  async resendConfirmationEmail(email: string): Promise<Result<boolean>> {
    // 1. Ищем юзера
    const user = await usersRepository.findByLoginOrEmail(email);

    // 2. Если не найден или уже подтвержден — возвращаем ошибку по ТЗ
    if (!user || user.emailConfirmation.isConfirmed) {
      return {
        status: ResultStatus.BadRequest,
        data: false,
        extensions: [
          { field: 'email', message: 'Email not found or already confirmed' },
        ],
      };
    }

    // 3. Генерируем новые данные (как в классе User)
    const newCode = crypto.randomUUID();
    const newExpDate = new Date(Date.now() + 90 * 60 * 1000); // +1.5 часа

    // 4. Обновляем в БД
    await usersRepository.updateConfirmationCode(user._id, newCode, newExpDate);

    // 5. Отправляем новое письмо
    nodemailerService
      .sendEmail(user.email, newCode, emailExamples.registrationEmail)
      .catch((e) => console.error(e));

    return { status: ResultStatus.Success, data: true, extensions: [] };
  },
};
