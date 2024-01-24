/* eslint-disable @typescript-eslint/no-explicit-any */
import { TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TGenericErrorResponse => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];

  return {
    statusCode: 400,
    message: 'Duplicate Entry',
    errorMessage: `${extractedMessage} is already exist.`,
    errorDetails: err,
  };
};

export default handleDuplicateError;
