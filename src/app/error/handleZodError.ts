import { ZodError, ZodIssue } from 'zod';
import { TGenericErrorResponse } from '../interface/error';

const zodErrorHandler = (err: ZodError): TGenericErrorResponse => {
  const errorMessage = err?.issues?.map(
    (issue: ZodIssue) => `${issue?.path[issue?.path?.length - 1]} is required`,
  );
  const formattedErrorMessage = errorMessage?.join('. ') || '';
  return {
    statusCode: 400,
    message: 'Validation error',
    errorMessage: formattedErrorMessage,
    errorDetails: err.issues,
  };
};

export default zodErrorHandler;
