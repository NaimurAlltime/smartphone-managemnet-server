import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { TSales } from './sales.interface';
import { SalesServices } from './sales.service';
import { Smartphone } from '../smartphone/smartphone.model';

const createSale = catchAsync(async (req, res) => {
  const saleData: TSales = req.body;
  const { quantity }: TSales = req.body;
  const { smartphoneId } = req.body;

  const result = await SalesServices.createSalesIntoDB(saleData);
  const productModel = await Smartphone.findById(smartphoneId);
  const productQuantity = productModel ? productModel.quantity : 0;

  const rest = productQuantity - quantity;

  if (productModel) {
    productModel.quantity = rest;
    await productModel.save();
  } else {
    // handle case where productModel is not found
    console.error('Product model not found.');
  }

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
