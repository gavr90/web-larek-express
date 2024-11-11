import { Request, Response, NextFunction } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';

const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { total, items } = req.body;
  try {
    const products = await Product.find({ _id: { $in: items } });

    if (products.length !== items.length) {
      throw new BadRequestError('Некорректный товар');
    }

    products.forEach((product) => {
      if (product.price === null) {
        throw new BadRequestError('Товар не продается');
      }
    });

    const productsPrice = products.reduce(
      (sum, product) => sum + product.price,
      0,
    );
    if (total !== productsPrice) {
      throw new BadRequestError('Некорректная сумма заказа');
    }

    return res.send({ id: faker.string.uuid(), total: productsPrice });
  } catch (error) {
    return next(error);
  }
};

export default createOrder;
