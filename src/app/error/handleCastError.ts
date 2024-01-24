import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];
  return {
    statusCode: 400,
    message: 'Invalid ID',
    errorMessage: `${extractedMessage} is not a valid ID!`,
    errorDetails: err,
  };
};

export default handleCastError;
