import { z } from 'zod';

const createSaleValidationSchema = z.object({
  buyer_name: z.string().min(1, { message: 'Buyer_name is required' }),
  quantity: z
    .number()
    .min(0, { message: 'Quantity must be greater than or equal to 0' }),
  sale_date: z.string().min(1, { message: 'Sale_date is required' }),
});

export const saleValidations = {
  createSaleValidationSchema,
};
