import { Request, Response, NextFunction } from 'express';
import Product from '../models/product';
import ConflictError from '../errors/conflict-error';

export const getProducts = (_req: Request, res: Response, next: NextFunction) => Product.find({})
  .then((products) => res.send({ items: products, total: products.length }))
  .catch((error) => next(error));

export const createProduct = (req: Request, res: Response, next: NextFunction) => {
  const product = req.body;

  return Product.create(product)
    .then((product) => res.send({ items: product }))
    .catch((error) => {
      if (error instanceof Error && error.message.includes('E11000')) {
        return next(new ConflictError('Поле title должно быть уникальным'));
      }
      return next(error);
    });
};
