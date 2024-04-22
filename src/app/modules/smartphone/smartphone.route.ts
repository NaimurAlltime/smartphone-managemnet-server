import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { smartphoneValidations } from './smartphone.validation';
import { SmartphoneControllers } from './smartphone.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// call will controller function
router.post(
  '/',
  auth('super-admin', 'branch-manager'),
  validateRequest(smartphoneValidations.createSmartphonesValidationSchema),
  SmartphoneControllers.createSmartphone,
);

// router.get('/', SmartphoneControllers.getAllSmartphone);

router.get(
  '/',
  auth('super-admin', 'branch-manager', 'seller'),
  SmartphoneControllers.getAllStockSmartphone,
);

router.get(
  '/:id',
  auth('super-admin', 'branch-manager', 'seller'),
  SmartphoneControllers.getSingleSmartphone,
);

router.patch(
  '/:productId',
  auth('super-admin', 'branch-manager'),
  validateRequest(smartphoneValidations.updateSmartphonesValidationSchema),
  SmartphoneControllers.updateSingleSmartphone,
);

router.delete(
  '/:id',
  auth('super-admin'),
  SmartphoneControllers.deleteSmartphone,
);

router.delete(
  '/',
  auth('super-admin'),
  SmartphoneControllers.deleteMultipleSmartphone,
);

export const SmartphoneRoutes = router;
