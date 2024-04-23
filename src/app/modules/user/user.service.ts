import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  const result = await User.create(userData);
  //send response without password,
  const { password, ...remainingData } = result.toObject();
  return remainingData;
};

const getAllUsersFromDB = async () => {
  const result = await User.find({
    role: { $ne: 'super-admin' },
  });

  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
};
