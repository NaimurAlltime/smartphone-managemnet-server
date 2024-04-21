import { Types } from 'mongoose';

export interface TSales {
  productId?: Types.ObjectId;
  productName: string;
  productImage: string;
  productPrice: number;
  quantity: number;
  buyerName: string;
  saleDate: string;
}
