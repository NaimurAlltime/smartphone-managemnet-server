import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorMessage = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) =>
      `${val?.message} is required`,
  );
  const formattedErrorMessage = errorMessage?.join('. ') || '';
  return {
    statusCode: 400,
    message: 'Validation error',
    errorMessage: formattedErrorMessage,
    errorDetails: err,
  };
};

export default handleValidationError;
