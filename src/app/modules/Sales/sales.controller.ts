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

export const SaleControllers = {
  createSale,
};
