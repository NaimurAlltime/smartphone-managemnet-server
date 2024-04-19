import { z } from 'zod';
import { Storage } from './smartphone.constant';

const createSmartphonesValidationSchema = z.object({
  name: z.string({
    invalid_type_error: 'Name must be a string',
    required_error: 'Name is required',
  }),
  price: z.number({
    invalid_type_error: 'Price must be a number',
    required_error: 'Price is required',
  }),
  quantity: z.number({
    invalid_type_error: 'Quantity must be a number',
    required_error: 'Quantity is required',
  }),
  releaseDate: z.string({
    invalid_type_error: 'Release date must be a string',
    required_error: 'Release date is required',
  }),
  brand: z.string({
    invalid_type_error: 'Brand must be a string',
    required_error: 'Brand is required',
  }),
  model: z.string({
    invalid_type_error: 'Model must be a string',
    required_error: 'Model is required',
  }),
  operatingSystem: z.enum(['iOS', 'Android'], {
    invalid_type_error: "Operating system must be either 'iOS' or 'Android'",
    required_error: 'Operating system is required',
  }),
  storage: z.object({
    ROM: z.enum(Storage as [string, ...string[]], {
      invalid_type_error: 'Invalid ROM size',
      required_error: 'ROM size is required',
    }),
    RAM: z.enum(Storage as [string, ...string[]], {
      invalid_type_error: 'Invalid RAM size',
      required_error: 'RAM size is required',
    }),
  }),
  screenSize: z.string({
    invalid_type_error: 'Screen size must be a string',
    required_error: 'Screen size is required',
  }),
  battery: z.string({
    invalid_type_error: 'Battery information must be a string',
    required_error: 'Battery information is required',
  }),
  camera: z.object({
    front: z.string({
      invalid_type_error: 'Front camera information must be a string',
      required_error: 'Front camera information is required',
    }),
    back: z.string({
      invalid_type_error: 'Back camera information must be a string',
      required_error: 'Back camera information is required',
    }),
  }),
  processor: z.object({
    type: z.string({
      invalid_type_error: 'Processor type must be a string',
      required_error: 'Processor type is required',
    }),
    speed: z.string({
      invalid_type_error: 'Processor speed must be a string',
      required_error: 'Processor speed is required',
    }),
  }),
  details: z.string({
    invalid_type_error: 'Details must be a string',
    required_error: 'Details are required',
  }),
  smartphoneImage: z
    .string({
      invalid_type_error: 'Product image must be a string',
      required_error: 'Product image is required',
    })
    .optional(),
});

const updateSmartphonesValidationSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name must be a string',
    })
    .optional(),
  price: z
    .number({
      invalid_type_error: 'Price must be a number',
    })
    .optional(),
  quantity: z
    .number({
      invalid_type_error: 'Quantity must be a number',
    })
    .optional(),
  releaseDate: z
    .string({
      invalid_type_error: 'Release date must be a string',
    })
    .optional(),
  brand: z
    .string({
      invalid_type_error: 'Brand must be a string',
    })
    .optional(),
  model: z
    .string({
      invalid_type_error: 'Model must be a string',
    })
    .optional(),
  operatingSystem: z
    .enum(['iOS', 'Android'], {
      invalid_type_error: "Operating system must be either 'iOS' or 'Android'",
    })
    .optional(),
  storage: z
    .object({
      ROM: z
        .enum(Storage as [string, ...string[]], {
          invalid_type_error: 'Invalid ROM size',
        })
        .optional(),
      RAM: z
        .enum(Storage as [string, ...string[]], {
          invalid_type_error: 'Invalid RAM size',
        })
        .optional(),
    })
    .optional(),
  screenSize: z
    .string({
      invalid_type_error: 'Screen size must be a string',
    })
    .optional(),
  battery: z
    .string({
      invalid_type_error: 'Battery information must be a string',
    })
    .optional(),
  camera: z
    .object({
      front: z
        .string({
          invalid_type_error: 'Front camera information must be a string',
        })
        .optional(),
      back: z
        .string({
          invalid_type_error: 'Back camera information must be a string',
        })
        .optional(),
    })
    .optional(),
  processor: z
    .object({
      type: z
        .string({
          invalid_type_error: 'Processor type must be a string',
        })
        .optional(),
      speed: z
        .string({
          invalid_type_error: 'Processor speed must be a string',
        })
        .optional(),
    })
    .optional(),
  details: z
    .string({
      invalid_type_error: 'Details must be a string',
    })
    .optional(),
  smartphoneImage: z
    .string({
      invalid_type_error: 'Product image must be a string',
    })
    .optional(),
});

export const smartphoneValidations = {
  createSmartphonesValidationSchema,
  updateSmartphonesValidationSchema,
};
