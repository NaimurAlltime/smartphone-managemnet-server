import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { smartphoneValidations } from './smartphone.validation';
import { SmartphoneControllers } from './smartphone.controller';

const router = express.Router();

// call will controller function
router.post(
  '/',
  validateRequest(smartphoneValidations.createSmartphonesValidationSchema),
  SmartphoneControllers.createSmartphone,
);

// router.get('/', SmartphoneControllers.getAllSmartphone);

router.get('/', SmartphoneControllers.getAllStockProducts);

router.get('/:id', SmartphoneControllers.getSingleSmartphone);

router.patch(
  '/:productId',
  validateRequest(smartphoneValidations.updateSmartphonesValidationSchema),
  SmartphoneControllers.updateSingleSmartphone,
);

router.delete('/:id', SmartphoneControllers.deleteSmartphone);

router.delete('/', SmartphoneControllers.deleteMultipleSmartphone);

export const SmartphoneRoutes = router;
