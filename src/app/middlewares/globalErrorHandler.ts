/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import AppError from '../error/AppError';
import handleCastError from '../error/handleCastError';
import handleDuplicateError from '../error/handleDuplicateError';
import handleValidationError from '../error/handleValidationError';
import zodErrorHandler from '../error/handleZodError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = 'Someting went wrong!';
  let errorMessage = 'Someting went wrong!';
  let errorDetails: unknown;
  if (err instanceof ZodError) {
    const simplifiedError = zodErrorHandler(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
    errorDetails = simplifiedError.errorDetails;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
    errorDetails = simplifiedError.errorDetails;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
    errorDetails = simplifiedError.errorDetails;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessage;
    errorDetails = simplifiedError.errorDetails;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    errorMessage = err?.message;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errDetails: err,
    stack: process.env.NODE_ENV ? err?.stack : null,
  });
};

export default globalErrorHandler;
