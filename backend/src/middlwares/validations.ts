import Joi from 'joi'

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
  items: Joi.array().items(
    Joi.object({
      _id: Joi.string().required(),
    })
  ).required(),
  total: Joi.number().required(),
  payment: Joi.string().valid(...Object.values(PaymentType)).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  adress: Joi.string().required(),
});