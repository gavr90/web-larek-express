import { Router } from 'express';
import { productSchema } from '../middlwares/validations';
import { createProduct, getProducts } from '../controllers/product';

const { celebrate, Segments } = require('celebrate');

const router = Router();

const productRouteValidator = celebrate({
  [Segments.BODY]: productSchema,
});

router.get('/', getProducts);
router.post('/', productRouteValidator, createProduct);

export default router;
