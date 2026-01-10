import { HttpStatus } from './http-statuses';

export type ValidationErrorType = {
  message: string;
  field?: string;
  status: HttpStatus;
};
