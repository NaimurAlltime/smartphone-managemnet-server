import { Types } from 'mongoose';
import { TSmartphone } from './smartphone.interface';
import { Smartphone } from './smartphone.model';
import { SmartphoneQueryParams } from './smartphone.constant';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';

const createSmartphoneIntoDB = async (payload: TSmartphone) => {
  const result = await Smartphone.create(payload);
  return result;
};

const getAllSmartphones = async (
  queryParams: SmartphoneQueryParams,
): Promise<TSmartphone[]> => {
  try {
    const {
      sortBy,
      sortOrder,
      price,
      minPrice,
      maxPrice,
      brand,
      model,
      releaseDate,
      operatingSystem,
      storageCapacity,
      screenSize,
    } = queryParams;

    // Build the filter object based on query parameters
    const filter: Record<string, any> = {};

    if (price) {
      filter.price = price;
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
      filter.price = { $gte: minPrice, $lte: maxPrice };
    }

    if (brand) {
      filter.brand = brand;
    }

    if (model) {
      filter.model = model;
    }

    if (releaseDate) {
      filter.releaseDate = releaseDate;
    }

    if (operatingSystem) {
      filter.operatingSystem = operatingSystem;
    }

    if (storageCapacity !== undefined) {
      filter.storageCapacity = storageCapacity;
    }

    if (screenSize !== undefined) {
      filter.screenSize = screenSize;
    }

    // Build the sort object based on sortBy and sortOrder
    const sort: Record<string, any> = {};
    if (sortBy && sortOrder) {
      sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    }

    // Execute the query without pagination
    const smartphones: TSmartphone[] = await Smartphone.find(filter).sort(sort);

    return smartphones;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error retrieving smartphones:', error.message);
    throw error;
  }
};

const updateSmartphoneIntoDB = async (
  smartphoneID: string,
  payload: Partial<TSmartphone>,
) => {
  const isValidObjectId = Types.ObjectId.isValid(smartphoneID);

  if (!isValidObjectId) {
    throw new AppError(httpStatus.NOT_FOUND, 'Smartphone not found!');
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
  getAllSmartphones,
  updateSmartphoneIntoDB,
  deleteSmartphoneIntoDB,
};
