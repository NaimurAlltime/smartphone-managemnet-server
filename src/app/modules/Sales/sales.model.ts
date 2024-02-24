import { Schema, model } from 'mongoose';
import { TSales } from './sales.interface';

const salesSchema = new Schema<TSales>({
  smartphone: {
    type: Schema.Types.ObjectId,
    ref: 'Smartphone',
  },
  buyer_name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  sale_date: {
    type: String,
    required: true,
  },
});

export const Sales = model<TSales>('SalesModel', salesSchema);
