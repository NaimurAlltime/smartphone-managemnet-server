import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { AuthValidations } from './auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidations.LoginUserValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/change-password',
  validateRequest(AuthValidations.changePasswordValidationSchema),
  AuthControllers.changePassword,
);

export const AuthRoutes = router;
