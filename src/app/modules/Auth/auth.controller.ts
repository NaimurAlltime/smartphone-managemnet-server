import httpStatus from 'http-status';
import { User } from '../user/user.model';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const username = req.body.username;
  const user = await User.findOne({ username });

  const result = await AuthServices.loginUser(req.body);

  const { accessToken } = result;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successful',
    data: {
      user: {
        _id: user?._id,
        username: user?.username,
        email: user?.email,
        role: user?.role,
      },
      token: accessToken,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  const user = req.user;

  // Check if user is defined before proceeding
  if (!user) {
    sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: 'User not authenticated',
      data: null,
    });
    return;
  }

  const result = await AuthServices.changePassword(user, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password changed successfully',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
};
