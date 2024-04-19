import { Model } from 'mongoose';

type TStorage =
  | '4GB'
  | '6GB'
  | '8GB'
  | '12GB'
  | '16GB'
  | '32GB'
  | '64GB'
  | '128GB'
  | '256GB'
  | '512GB';

export type TSmartphone = {
  name: string;
  price: number;
  quantity: number;
  releaseDate: string;
  brand: string;
  model: string;
  operatingSystem: 'iOS' | 'Android';
  storage: {
    ROM: TStorage;
    RAM: TStorage;
  };
  screenSize: string;
  battery: string;
  camera: {
    front: string;
    back: string;
  };
  processor: {
    type: string;
    speed: string;
  };
  details: string;
  smartphoneImage: string;
};

// for creating static
export interface SmartphoneModel extends Model<TSmartphone> {
  isSmartphoneExists(name: string): Promise<TSmartphone | null>;
}
