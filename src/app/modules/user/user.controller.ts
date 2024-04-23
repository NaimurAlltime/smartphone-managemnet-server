import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { TUser } from './user.interface';
import { UserServices } from './user.service';
import sendResponse from '../utils/sendResponse';
import httpStatus from 'http-status';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const userData: TUser = req.body;

  const result = await UserServices.createUserIntoDB(userData);

  //send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (_req, res) => {
  const result = await UserServices.getAllUsersFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users retrieved successfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getAllUsers,
};
