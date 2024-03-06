import { z } from 'zod';

const createSmartphonesValidationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  price: z
    .number()
    .min(0, { message: 'Price must be greater than or equal to 0' }),
  quantity: z
    .number()
    .min(0, { message: 'Quantity must be greater than or equal to 0' }),
  description: z.string().min(1, { message: 'Description is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  releaseDate: z.string().min(1, { message: 'releaseDate is required' }),
  brand: z.string().min(1, { message: 'Brand is required' }),
  model: z.string().min(1, { message: 'Model is required' }),
  operatingSystem: z
    .string()
    .min(1, { message: 'Operating System is required' }),
  storageCapacity: z
    .number()
    .min(0, { message: 'Storage Capacity must be greater than or equal to 0' }),
  screenSize: z
    .number()
    .min(0, { message: 'Screen Size must be greater than or equal to 0' }),
  cameraQuality: z.string().min(1, { message: 'Camera Quality is required' }),
  batteryLife: z.string().min(1, { message: 'Battery Life is required' }),
  smartphoneImage: z
    .string()
    .min(1, { message: 'smartphoneImage Life is required' }),
});

const updateSmartphonesValidationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }).nullable(),
  price: z
    .number()
    .min(0, { message: 'Price must be greater than or equal to 0' })
    .nullable(),
  quantity: z
    .number()
    .min(0, { message: 'Quantity must be greater than or equal to 0' })
    .nullable(),
  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .nullable(),
  category: z.string().min(1, { message: 'Category is required' }).nullable(),
  releaseDate: z
    .string()
    .min(1, { message: 'releaseDate is required' })
    .nullable(),
  brand: z.string().min(1, { message: 'Brand is required' }).nullable(),
  model: z.string().min(1, { message: 'Model is required' }).nullable(),
  operatingSystem: z
    .string()
    .min(1, { message: 'Operating System is required' })
    .nullable(),
  storageCapacity: z
    .number()
    .min(0, { message: 'Storage Capacity must be greater than or equal to 0' })
    .nullable(),
  screenSize: z
    .number()
    .min(0, { message: 'Screen Size must be greater than or equal to 0' })
    .nullable(),
  cameraQuality: z
    .string()
    .min(1, { message: 'Camera Quality is required' })
    .nullable(),
  batteryLife: z
    .string()
    .min(1, { message: 'Battery Life is required' })
    .nullable(),
  smartphoneImage: z
    .string()
    .min(1, { message: 'smartphoneImage Life is required' }),
});

export const smartphoneValidations = {
  createSmartphonesValidationSchema,
  updateSmartphonesValidationSchema,
};
