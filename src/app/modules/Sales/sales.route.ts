import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { saleValidations } from './sales.validation';
import { SaleControllers } from './sales.controller';

const router = express.Router();

// call will controller function
router.post(
  '/',
  validateRequest(saleValidations.createSaleValidationSchema),
  SaleControllers.createSale,
);

router.get('/', SaleControllers.getSalesHistory);

export const SaleRoutes = router;
