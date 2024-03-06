import { Schema, model } from 'mongoose';
import { SmartphoneModel, TSmartphone } from './smartphone.interface';

const smartphoneSchema = new Schema<TSmartphone, SmartphoneModel>(
  {
    name: { type: String, required: [true, 'Name is required'] },
    price: { type: Number, required: [true, 'Price is required'] },
    quantity: { type: Number, required: [true, 'Quantity is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    category: { type: String, required: [true, 'Category is required'] },
    releaseDate: { type: String, required: [true, 'Release Date is required'] },
    brand: { type: String, required: [true, 'Brand is required'] },
    model: { type: String, required: [true, 'Model is required'] },
    operatingSystem: {
      type: String,
      required: [true, 'Operating System is required'],
    },
    storageCapacity: {
      type: Number,
      required: [true, 'Storage Capacity is required'],
    },
    screenSize: { type: Number, required: [true, 'Screen Size is required'] },
    cameraQuality: {
      type: String,
      required: [true, 'Camera Quality is required'],
    },
    batteryLife: { type: String, required: [true, 'Battery Life is required'] },
    smartphoneImage: {
      type: String,
      required: [true, 'smartphoneImage Life is required'],
    },
  },
  {
    timestamps: true,
  },
);

export const Smartphone = model<TSmartphone, SmartphoneModel>(
  'Smartphone',
  smartphoneSchema,
);
