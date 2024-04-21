import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { SalesServices } from './sales.service';

const createSale = catchAsync(async (req, res) => {
  const result = await SalesServices.createSalesIntoDB(req.body);
  //send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sale Created successfully',
    data: result,
  });
});

const getSalesHistory = catchAsync(async (req, res) => {
  const result = await SalesServices.getSalesHistoryIntoDB(req.query);

  //send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sales History retrieved successfully',
    data: result,
  });
});

export const SaleControllers = {
  createSale,
  getSalesHistory,
};
