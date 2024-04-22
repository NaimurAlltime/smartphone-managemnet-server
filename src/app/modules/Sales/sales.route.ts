import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { saleValidations } from './sales.validation';
import { SaleControllers } from './sales.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// call will controller function
router.post(
  '/',
  auth('super-admin', 'seller'),
  validateRequest(saleValidations.createSaleValidationSchema),
  SaleControllers.createSale,
);

router.get('/', auth('super-admin'), SaleControllers.getSalesHistory);

export const SaleRoutes = router;
