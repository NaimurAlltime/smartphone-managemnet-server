import { z } from 'zod';

const LoginUserValidationSchema = z.object({
  username: z.string({
    required_error: 'User name is required',
    invalid_type_error: 'User name must be a string',
  }),
  password: z.string({
    required_error: 'User password is required',
    invalid_type_error: 'User password must be a string',
  }),
});

const changePasswordValidationSchema = z.object({
  currentPassword: z.string({
    required_error: 'Current password is required',
  }),
  newPassword: z
    .string({
      required_error: 'newPassword is required',
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
});

export const AuthValidations = {
  LoginUserValidationSchema,
  changePasswordValidationSchema,
};
