import { TSmartphone } from './smartphone.interface';

export type SmartphoneQueryParams = {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  price?: number;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  model?: string;
  releaseDate?: string;
  operatingSystem?: string;
  storageCapacity?: number;
  screenSize?: number;
};

export type ReturnData = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    smartphones: TSmartphone[];
  };
};
