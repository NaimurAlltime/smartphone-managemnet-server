import catchAsync from '../utils/catchAsync';
import { TSmartphone } from './smartphone.interface';
import { SmartphoneServices } from './smartphone.service';

const createSmartphone = catchAsync(async (req, res) => {
  const smartphoneData: TSmartphone = req.body;

  const result =
    await SmartphoneServices.createSmartphoneIntoDB(smartphoneData);

  //send response
  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'Smartphone Created successfully',
    data: result,
  });
});

export const SmartphoneControllers = {
  createSmartphone,
};
