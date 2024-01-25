import { Types } from 'mongoose';
import { TSmartphone } from './smartphone.interface';
import { Smartphone } from './smartphone.model';

const createSmartphoneIntoDB = async (smartphoneData: TSmartphone) => {
  const result = await Smartphone.create(smartphoneData);
  return result;
};

const updateSmartphoneIntoDB = async (
  smartphoneID: string,
  payload: Partial<TSmartphone>,
) => {
  const isValidObjectId = Types.ObjectId.isValid(smartphoneID);

  if (!isValidObjectId) {
    throw new Error('Smartphone not found!');
  } else {
    const result = await Smartphone.findByIdAndUpdate(smartphoneID, payload, {
      new: true,
    });
    return result;
  }
};

const deleteSmartphoneIntoDB = async (smartphoneID: string) => {
  const isValidObjectId = Types.ObjectId.isValid(smartphoneID);

  if (!isValidObjectId) {
    throw new Error('Smartphone not found!');
  } else {
    const result = await Smartphone.findByIdAndDelete(smartphoneID);
    return result;
  }
};

export const SmartphoneServices = {
  createSmartphoneIntoDB,
  updateSmartphoneIntoDB,
  deleteSmartphoneIntoDB,
};
