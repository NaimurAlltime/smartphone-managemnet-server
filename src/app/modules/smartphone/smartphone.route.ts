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

router.get('/', SmartphoneControllers.getAllSmartphone);

router.put(
  '/:id',
  validateRequest(smartphoneValidations.updateSmartphonesValidationSchema),
  SmartphoneControllers.updateSmartphone,
);

router.delete('/:id', SmartphoneControllers.deleteSmartphone);

export const SmartphoneRoutes = router;
