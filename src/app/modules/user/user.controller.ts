import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { TUser } from './user.interface';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const userData: TUser = req.body;

  const result = await UserServices.createUserIntoDB(userData);

  //send response
  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
};
