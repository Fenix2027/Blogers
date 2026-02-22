import jwt from 'jsonwebtoken';
import { appConfig } from '../../common/config/config';

export const jwtService = {
  // Метод для Access Token
  async createAccessToken(userId: string): Promise<string> {
    return jwt.sign({ userId }, appConfig.AC_SECRET, {
      expiresIn: '10m', // Короткое время жизни
    });
  },

  // Метод для Refresh Token
  async createRefreshToken(userId: string): Promise<string> {
    return jwt.sign({ userId }, appConfig.RT_SECRET!, { // Внимание: нужен RT_SECRET в конфиге
      expiresIn: '20d', // Длинное время жизни
    });
  },

  async decodeToken(token: string): Promise<any> {
    try {
      return jwt.decode(token);
    } catch (e: unknown) {
      console.error("Can't decode token", e);
      return null;
    }
  },

  // Проверка Access Token
  async verifyToken(token: string): Promise<{ userId: string } | null> {
    try {
      return jwt.verify(token, appConfig.AC_SECRET) as { userId: string };
    } catch (error) {
      return null;
    }
  },

  // Проверка Refresh Token (использует другой секрет)
  async verifyRefreshToken(token: string): Promise<{ userId: string } | null> {
    try {
      return jwt.verify(token, appConfig.RT_SECRET!) as { userId: string };
    } catch (error) {
      return null;
    }
  },
};
