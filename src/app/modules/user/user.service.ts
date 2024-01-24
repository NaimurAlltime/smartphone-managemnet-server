/* eslint-disable @typescript-eslint/no-unused-vars */
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData);
  //send response without password, passwordHistory,
  const { password, passwordChangeHistory, ...remainingData } =
    result.toObject();
  return remainingData;
};

export const UserServices = {
  createUserIntoDB,
};
