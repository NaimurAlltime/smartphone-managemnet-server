import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { userValidations } from './user.validation';

const router = express.Router();

router.post(
  '/register',
  validateRequest(userValidations.createUserValidationSchema),
  UserControllers.createUser,
);

router.get('/users', UserControllers.getAllUsers);

export const UserRoutes = router;
