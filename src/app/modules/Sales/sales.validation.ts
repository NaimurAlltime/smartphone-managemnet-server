import { z } from 'zod';

export const createSaleValidationSchema = z.object({
  productId: z.string({
    invalid_type_error: 'Product id must be a string',
    required_error: 'Product id is required',
  }),
  quantity: z
    .number({
      invalid_type_error: 'Quantity must be a number',
      required_error: 'Product quantity is required',
    })
    .min(1),
  buyerName: z.string({
    invalid_type_error: 'Buyer name must be a string',
    required_error: 'Buyer name is required',
  }),
  saleDate: z.string({
    invalid_type_error: 'Sale date must be a string',
    required_error: 'Sale date is required',
  }),
});

export const saleValidations = {
  createSaleValidationSchema,
};
