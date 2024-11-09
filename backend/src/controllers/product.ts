import { Request, Response } from 'express';
import Product from '../models/product';

export const getProducts = (req: Request, res: Response) => {
    return Product.find({})
      .then(products => res.send({ items: products, total: products.length }))
      .catch(() => res.status(500).send({ message: 'Произошла ошибка' }))
}

export const createProduct = (req: Request, res: Response) => {
    const product = req.body;

    return Product.create(product)
      .then(product => res.send({ items: product }))
      .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
}