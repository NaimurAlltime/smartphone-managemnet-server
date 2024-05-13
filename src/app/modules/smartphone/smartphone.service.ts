import { Types } from 'mongoose';
import { TSmartphone } from './smartphone.interface';
import { Smartphone } from './smartphone.model';

const createSmartphoneIntoDB = async (payload: TSmartphone) => {
  const result = await Smartphone.create(payload);
  return result;
};

const getAllSmartphones = async () => {
  const result = await Smartphone.find();

  return result;
};

const getAllStockSmartphoneFromDB = async (query: Record<string, unknown>) => {
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

const updateSingleSmartphoneIntoDB = async (
  id: string,
  payload: Partial<TSmartphone>,
) => {
  const {
    name,
    price,
    quantity,
    releaseDate,
    brand,
    model,
    operatingSystem,
    storage,
    screenSize,
    battery,
    camera,
    processor,
    details,
    smartphoneImage,
  } = payload;

  const updatedInfo: Record<string, unknown> = {};

  if (storage && Object.keys(storage).length > 0) {
    Object.entries(storage).forEach(([key, value]) => {
      updatedInfo[`storage.${key}`] = value;
    });
  }

  if (camera && Object.keys(camera).length > 0) {
    Object.entries(camera).forEach(([key, value]) => {
      updatedInfo[`camera.${key}`] = value;
    });
  }

  if (processor && Object.keys(processor).length > 0) {
    Object.entries(processor).forEach(([key, value]) => {
      updatedInfo[`camera.${key}`] = value;
    });
  }

  if (name) {
    updatedInfo.name = name;
  }

  if (price) {
    updatedInfo.price = price;
  }

  if (quantity) {
    updatedInfo.quantity = quantity;
  }

  if (releaseDate) {
    updatedInfo.releaseDate = releaseDate;
  }

  if (brand) {
    updatedInfo.brand = brand;
  }

  if (model) {
    updatedInfo.model = model;
  }

  if (operatingSystem) {
    updatedInfo.operatingSystem = operatingSystem;
  }

  if (screenSize) {
    updatedInfo.screenSize = screenSize;
  }

  if (battery) {
    updatedInfo.battery = battery;
  }

  if (details) {
    updatedInfo.details = details;
  }

  if (smartphoneImage) {
    updatedInfo.smartphoneImage = smartphoneImage;
  }

  // update the productinfo
  const result = await Smartphone.findByIdAndUpdate(id, updatedInfo, {
    new: true,
    runValidators: true,
  });

  return result;
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
  getAllStockSmartphoneFromDB,
  getSingleSmartphoneIntoDB,
  updateSingleSmartphoneIntoDB,
  deleteSmartphoneIntoDB,
  deleteMultipleSmartphoneFromDB,
};
