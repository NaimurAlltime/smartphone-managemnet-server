import { Schema, model } from 'mongoose';
import { TSales } from './sales.interface';

const salesSchema = new Schema<TSales>(
  {
    productName: {
      type: String,
      trim: true,
    },
    productPrice: {
      type: Number,
      required: [true, 'Product price is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Product quantity is required'],
      min: 1,
    },
    buyerName: {
      type: String,
      required: [true, 'Buyer name is required'],
      trim: true,
    },
    saleDate: {
      type: String,
      required: [true, 'Sale date is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Sales = model<TSales>('Sale', salesSchema);
