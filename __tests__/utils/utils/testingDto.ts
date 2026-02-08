export type UserDto = {
  login: string;
  email: string
  pass: string
}

export const testingDtosCreator = {
  createUserDto({ login, email, pass }: {
    login?: string;
    email?: string;
    pass?: string
  }): UserDto {
    // Генерируем уникальный суффикс на основе текущего времени
    const uniqueSuffix = Date.now().toString().slice(-4);

    return {
      login: login ?? `user_${uniqueSuffix}`,
      email: email ?? `test${uniqueSuffix}@mail.com`,
      pass: pass ?? '12345678',
    };
  }
};
