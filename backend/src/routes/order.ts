import { Router } from 'express';
import createOrder from '../controllers/order';
import { orderSchema } from '../middlwares/validations';

const { celebrate, Segments } = require('celebrate');

const router = Router();

const orderRouteValidator = celebrate({
  [Segments.BODY]: orderSchema,
});

router.post('/', orderRouteValidator, createOrder);

export default router;
