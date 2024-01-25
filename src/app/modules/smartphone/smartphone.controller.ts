import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import sendResponse from '../utils/sendResponse';
import { TSmartphone } from './smartphone.interface';
import { SmartphoneServices } from './smartphone.service';

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
  updateSmartphone,
  deleteSmartphone,
};
