import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../error/AppError';
import { User } from '../user/user.model';
import { convertDate } from '../utils/convartDate';
import { TChangePassword, TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';

const loginUser = async (payload: TLoginUser) => {
  const { username, password } = payload;

  // check if the user is exist
  const user = await User.isUserExistsByCustomUsername(username);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // check if the password is correct
  const isPasswordMatch = await User.isPasswordMatched(
    password,
    user?.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

  const jwtPayload = {
    _id: user?._id,
    username: user?.username,
    role: user?.role,
    email: user?.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expiration as string,
  );

  return {
    accessToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: TChangePassword,
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByCustomUsername(userData.username);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  //checking if the password is correct
  if (
    !(await User.isPasswordMatched(payload.currentPassword, user?.password))
  ) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  let isPasswordUnique = false;
  let date;

  // check if the new password is unique from the last two passwords
  if (user.passwordChangeHistory) {
    isPasswordUnique = user.passwordChangeHistory.every((prevPassword) => {
      const isMatched = bcrypt.compareSync(
        payload.newPassword,
        prevPassword.password,
      );
      date = isMatched ? convertDate(prevPassword.createdAt) : null;
      return !isMatched;
    });
  }

  if (!isPasswordUnique) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Password change failed. Ensure the new password is unique and not among the last 2 used ${
        date && `(last used on ${date})`
      }`,
    );
  } else {
    // update the previous passwords
    await User.findByIdAndUpdate(user._id, {
      $push: {
        passwordChangeHistory: {
          $each: [
            {
              password: user.password,
              createdAt: new Date(),
            },
          ],
          $slice: -2,
        },
      },
    });
  }

  // update the password
  const updateUser = await User.findByIdAndUpdate(
    user._id,
    {
      password: newHashedPassword,
    },
    { new: true },
  );

  return updateUser;
};

export const AuthServices = {
  loginUser,
  changePassword,
};
