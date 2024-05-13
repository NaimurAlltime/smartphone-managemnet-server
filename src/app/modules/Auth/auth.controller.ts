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
        fullName: user?.fullName,
        username: user?.username,
        email: user?.email,
        role: user?.role,
        profileImage: user?.profileImage,
      },
      token: accessToken,
    },
  });
});

export const AuthControllers = {
  loginUser,
};
