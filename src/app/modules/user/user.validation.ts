import z from 'zod';
import { UserRoles } from './user.constant';

const createUserValidationSchema = z.object({
  fullName: z
    .string({
      invalid_type_error: 'Full name must be string',
      required_error: 'Full name is required',
    })
    .min(3, { message: 'Full name must be at least 3 characters long' }),
  username: z
    .string({
      invalid_type_error: 'userName must be string',
      required_error: 'userName is required',
    })
    .min(3, { message: 'Username must be at least 3 characters long' }),
  email: z
    .string({
      invalid_type_error: 'Email must be string',
      required_error: 'Email is required',
    })
    .email({ message: 'Invalid email address' }),
  password: z
    .string({
      invalid_type_error: 'Password must be string',
      required_error: 'Password is required',
    })
    .min(8, 'Password must be at least 8 characters long')
    .max(100, 'Password must be at most 100 characters long')
    .refine((password) => /\d/.test(password), {
      message: 'Password must contain at least one digit',
    })
    .refine((password) => /[a-z]/.test(password), {
      message: 'Password must contain at least one lowercase letter',
    })
    .refine((password) => /[A-Z]/.test(password), {
      message: 'Password must contain at least one uppercase letter',
    })
    .refine((password) => /[!@#$%^&*(),.?":{}|<>]/.test(password), {
      message: 'Password must contain at least one special character',
    }),
  role: z.enum(UserRoles as [string, ...string[]]),
  profileImage: z
    .string({
      invalid_type_error: 'profile image must be string',
    })
    .optional(),
});

export const userValidations = {
  createUserValidationSchema,
};
