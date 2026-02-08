import { testingDtosCreator, UserDto } from './testingDto';
import request from 'supertest';
import { routersPaths } from '../../../src/common/path/paths';
import {
  ADMIN_PASSWORD,
  ADMIN_USERNAME,
} from '../../../src/auth/middlewares/super-admin.guard-middleware';

export const createUser = async (app: any, userDto?: UserDto) => {
  const dto = userDto ?? testingDtosCreator.createUserDto({});

  const resp = await request(app)
    .post(routersPaths.users)
    .auth(ADMIN_USERNAME, ADMIN_PASSWORD)
    .send({
      login: dto.login,
      email: dto.email,
      password: dto.pass,
    })
  if (resp.status !== 201) {
    console.log('🔴 Ошибка создания пользователя:', resp.body);
    console.log('Отправленные данные:', {
      login: dto.login,
      email: dto.email,
      password: dto.pass,
    });
  }

  expect(resp.status).toBe(201);
  return resp.body;
};