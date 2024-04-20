import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { TSmartphone } from './smartphone.interface';
import { SmartphoneServices } from './smartphone.service';
import { SmartphoneQueryParams } from './smartphone.constant';

const createSmartphone = catchAsync(async (req, res) => {
  const smartphoneData: TSmartphone = req.body;

  const result =
    await SmartphoneServices.createSmartphoneIntoDB(smartphoneData);

  //send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Smartphone Created successfully',
    data: result,
  });
});

const getAllSmartphone = catchAsync(async (req, res) => {
  // const queryParams: SmartphoneQueryParams = req.query;
  const result = await SmartphoneServices.getAllSmartphones();

  //send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Smartphones retrieved successfully',
    data: result,
  });
});

const getAllStockProducts = catchAsync(async (req, res) => {
  const result = await SmartphoneServices.getAllStockProductsFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Products retrieved successfully',
    data: result,
  });
});

const getSingleSmartphone = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await SmartphoneServices.getSingleSmartphoneIntoDB(id);

  //send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Smartphones retrieved successfully',
    data: result,
  });
});

const updateSingleSmartphone = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const result = await SmartphoneServices.updateSingleSmartphoneIntoDB(
    productId,
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Smartphone updated successfully',
    data: result,
  });
});

const deleteSmartphone = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await SmartphoneServices.deleteSmartphoneIntoDB(id);

  //send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Smartphone Deleted successfully',
    data: result,
  });
});

const deleteMultipleSmartphone = catchAsync(async (req, res) => {
  const result = await SmartphoneServices.deleteMultipleSmartphoneFromDB(
    req.body,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Smartphone are deleted successfully',
    data: result,
  });
});

export const SmartphoneControllers = {
  createSmartphone,
  getAllSmartphone,
  getAllStockProducts,
  getSingleSmartphone,
  updateSingleSmartphone,
  deleteSmartphone,
  deleteMultipleSmartphone,
};
