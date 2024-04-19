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

// const getAllSmartphones = async (
//   queryParams: SmartphoneQueryParams,
// ): Promise<TSmartphone[]> => {
//   try {
//     const {
//       sortBy,
//       sortOrder,
//       price,
//       minPrice,
//       maxPrice,
//       brand,
//       category,
//       model,
//       releaseDate,
//       operatingSystem,
//       storageCapacity,
//       screenSize,
//     } = queryParams;

//     // Build the filter object based on query parameters
//     const filter: Record<string, any> = {};

//     // if (price) {
//     //   filter.price = price;
//     // }

//     if (minPrice !== undefined && maxPrice !== undefined) {
//       filter.price = { $gte: minPrice, $lte: maxPrice };
//     }

//     if (brand) {
//       filter.brand = brand;
//     }

//     if (category) {
//       filter.category = category;
//     }

//     if (model) {
//       filter.model = model;
//     }

//     if (releaseDate) {
//       filter.releaseDate = releaseDate;
//     }

//     if (operatingSystem) {
//       filter.operatingSystem = operatingSystem;
//     }

//     if (storageCapacity !== undefined) {
//       filter.storageCapacity = storageCapacity;
//     }

//     if (screenSize !== undefined) {
//       filter.screenSize = screenSize;
//     }

//     // Build the sort object based on sortBy and sortOrder
//     const sort: Record<string, any> = {};
//     if (sortBy && sortOrder) {
//       sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
//     }

//     // Execute the query without pagination
//     const smartphones: TSmartphone[] = await Smartphone.find(filter).sort(sort);

//     return smartphones;
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (error: any) {
//     console.error('Error retrieving smartphones:', error.message);
//     throw error;
//   }
// };

const getAllSmartphones = async () => {
  const result = await Smartphone.find();

  return result;
};

const getAllStockProductsFromDB = async (query: Record<string, unknown>) => {
  // filter object
  const filterObj: Record<string, unknown> = {};

  // filtering by product name
  const name = query?.name;
  if (name) {
    filterObj.name = {
      $regex: name,
      $options: 'i',
    };
  }

  // filtering by price range
  const price = query?.price;
  if (price) {
    const [min, max] = (price as string).split(',');
    filterObj.price = {
      $gte: Number(min),
      $lte: Number(max),
    };
  }

  // filtering by release date range
  const releaseDateRange = query?.releaseDate;
  if (releaseDateRange) {
    const [startDate, endDate] = (releaseDateRange as string).split(',');
    filterObj.releaseDate = {
      $gte: startDate,
      $lte: endDate,
    };
  }

  // filtering by brand
  const brand = query?.brand;
  if (brand) {
    filterObj.brand = {
      $regex: brand,
      $options: 'i',
    };
  }

  // filtering by model
  const model = query?.model;
  if (model) {
    filterObj.model = {
      $regex: model,
      $options: 'i',
    };
  }

  // filtering by operating system
  const operatingSystem = query?.operatingSystem;
  if (operatingSystem) {
    filterObj.operatingSystem = {
      $eq: operatingSystem,
    };
  }

  // filtering by storage
  const rom = query?.rom;
  const ram = query?.ram;

  if (rom) {
    filterObj['storage.ROM'] = {
      $eq: rom,
    };
  }

  if (ram) {
    filterObj['storage.RAM'] = {
      $eq: ram,
    };
  }

  // filtering by screen size
  const screenSize = query?.screenSize;
  if (screenSize) {
    filterObj.screenSize = {
      $eq: screenSize,
    };
  }

  // filtering by camera
  const frontCamera = query?.frontCamera;
  const backCamera = query?.backCamera;

  if (frontCamera) {
    filterObj['camera.front'] = {
      $eq: frontCamera,
    };
  }

  if (backCamera) {
    filterObj['camera.back'] = {
      $eq: backCamera,
    };
  }

  // filtering by battery
  const battery = query?.battery;
  if (battery) {
    filterObj.battery = {
      $eq: battery,
    };
  }

  // filtering by processor
  const processorType = query?.processorType;
  const processorSpeed = query?.processorSpeed;

  if (processorType) {
    filterObj['processor.type'] = {
      $eq: processorType,
    };
  }

  if (processorSpeed) {
    filterObj['processor.speed'] = {
      $eq: processorSpeed,
    };
  }

  // get all products which have quantity > 0
  filterObj.quantity = {
    $gt: 0,
  };

  const result = await Smartphone.find(filterObj);
  return result;
};

const getSingleSmartphoneIntoDB = async (id: string) => {
  const result = await Smartphone.findById(id);
  return result;
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

const deleteMultipleSmartphoneFromDB = async (payload: {
  idList: string[];
}) => {
  const idList = payload.idList;
  const result = Smartphone.deleteMany({
    _id: {
      $in: idList,
    },
  });

  return result;
};

export const SmartphoneServices = {
  createSmartphoneIntoDB,
  getAllSmartphones,
  getAllStockProductsFromDB,
  getSingleSmartphoneIntoDB,
  updateSmartphoneIntoDB,
  deleteSmartphoneIntoDB,
  deleteMultipleSmartphoneFromDB,
};
