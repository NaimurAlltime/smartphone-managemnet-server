import { TSmartphone } from './smartphone.interface';

export type SmartphoneQueryParams = {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  price?: number;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  category?: string;
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

export const OperatingSystems = ['iOS', 'Android'];

export const Storage = [
  '4GB',
  '6GB',
  '8GB',
  '12GB',
  '16GB',
  '32GB',
  '64GB',
  '128GB',
  '256GB',
  '512GB',
];
