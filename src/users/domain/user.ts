import { ObjectId } from 'mongodb'; // Добавь импорт
import { randomUUID } from 'crypto';

export class User {
  _id: ObjectId;
  login: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  emailConfirmation: {
    confirmationCode: string;
    expirationDate: Date;
    isConfirmed: boolean;
  }

  constructor(login: string, email: string, hash: string) {
    this._id = new ObjectId();
    this.login = login;
    this.email = email;
    this.passwordHash = hash;
    this.createdAt = new Date();
    this.emailConfirmation = {
      expirationDate: new Date(Date.now() + 90 * 60 * 1000),
      confirmationCode: randomUUID(),
      isConfirmed: false
    }
  }
}
