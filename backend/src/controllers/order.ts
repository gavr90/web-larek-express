import { Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import { IOrder } from 'middlwares/validations';


export const createOrder = (req: Request, res: Response) => {
  const order: IOrder = req.body;
  console.log(req.body);
  res.status(200).send({ id: faker.string.uuid(), total: order.total })
}