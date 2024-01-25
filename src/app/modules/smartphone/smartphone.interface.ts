import { Model } from 'mongoose';

export type TSmartphone = {
  name: string;
  price: number;
  quantity: number;
  description: string;
  category: string;
  releaseDate: string;
  brand: string;
  model: string;
  operatingSystem: string;
  storageCapacity: number;
  screenSize: number;
  cameraQuality: string;
  batteryLife: string;
};

// for creating static
export interface SmartphoneModel extends Model<TSmartphone> {
  isSmartphoneExists(name: string): Promise<TSmartphone | null>;
}
