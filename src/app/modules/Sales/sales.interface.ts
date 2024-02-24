import { Types } from 'mongoose';

export type TSales = {
  smartphone: Types.ObjectId;
  buyer_name: string;
  quantity: number;
  sale_date: string;
};
