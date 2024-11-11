import Joi from 'joi';

export enum PaymentType {
  Card = 'card',
  Online = 'online',
}

export interface IOrder {
  items: string[];
  total: number;
  payment: PaymentType;
  email: string;
  phone: string;
  address: string;
}

export const orderSchema = Joi.object({
  items: Joi.array().items(Joi.string().required()).required(),
  total: Joi.number().required(),
  payment: Joi.string().valid(...Object.values(PaymentType)).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
});

const imageSchema = Joi.object({
  fileName: Joi.string().required(),
  originalName: Joi.string().required(),
});

export const productSchema = Joi.object({
  title: Joi.string().min(2).max(30).required(),
  image: imageSchema,
  category: Joi.string().required(),
  description: Joi.string(),
  price: Joi.number().allow(null),
});
