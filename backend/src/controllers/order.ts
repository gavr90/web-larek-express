import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { total, items } = req.body;
  try {
    const products = await Product.find({ '_id': { $in: items } });

    if (products.length !== items.length) {
      return new BadRequestError('Товара не существует');
    }

    products.forEach((product) => {
      if (product.price === null) {
        return new BadRequestError('Товар не продается');
      }
    });

    const productsPrice = products.reduce((sum, product) => sum + product.price, 0);
    if (total !== productsPrice) {
      return new BadRequestError('Некорректная сумма заказа');
    }

    return res.send({ id: faker.string.uuid(), total: total });

  } catch (error) {
    return next(error)
  }
}