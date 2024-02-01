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
  const queryParams: SmartphoneQueryParams = req.query;
  const result = await SmartphoneServices.getAllSmartphones(queryParams);

  //send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Smartphones retrieved successfully',
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

const updateSmartphone = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SmartphoneServices.updateSmartphoneIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Smartphone updated successfully!',
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

export const SmartphoneControllers = {
  createSmartphone,
  getAllSmartphone,
  getSingleSmartphone,
  updateSmartphone,
  deleteSmartphone,
};
