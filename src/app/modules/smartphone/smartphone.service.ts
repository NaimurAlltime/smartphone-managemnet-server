import { TSmartphone } from './smartphone.interface';
import { Smartphone } from './smartphone.model';

const createSmartphoneIntoDB = async (smartphoneData: TSmartphone) => {
  const result = await Smartphone.create(smartphoneData);
  return result;
};

export const SmartphoneServices = {
  createSmartphoneIntoDB,
};
