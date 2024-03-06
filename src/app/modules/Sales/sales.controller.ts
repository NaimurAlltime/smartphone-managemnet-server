import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { TSales } from './sales.interface';
import { SalesServices } from './sales.service';

const createSale = catchAsync(async (req, res) => {
  const saleData: TSales = req.body;

  const result = await SalesServices.createSalesIntoDB(saleData);

  //send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sale Created successfully',
    data: result,
  });
});

const getSalesHistory = catchAsync(async (req, res) => {
  const { timeFrame } = req.query;

  const result = await SalesServices.getSalesHistoryIntoDB(timeFrame as any);

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
