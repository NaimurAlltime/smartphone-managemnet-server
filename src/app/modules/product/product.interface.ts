import { Model } from 'mongoose';

export type TProduct = {
  name: string;
  price: number;
  quantity: number;
  description: string;
  category: string;
  releaseDate: Date;
  brand: string;
  model: string;
  operatingSystem: string;
  storageCapacity: number;
  screenSize: number;
  cameraQuality: string;
  batteryLife: string;
};

// for creating static
export interface ProductModel extends Model<TProduct> {
  isUserExists(model: string): Promise<TProduct | null>;
}
