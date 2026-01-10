import { HttpStatus } from './http-statuses';

type ValidationErrorOutput = {
  message: string;
  field: string;
};


export type ValidationErrorListOutput = {
  errorsMessages: ValidationErrorOutput[];
};
