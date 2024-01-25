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

router.delete('/:id', SmartphoneControllers.deleteSmartphone);

export const SmartphoneRoutes = router;
