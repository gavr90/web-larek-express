import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import productRouter from './routes/product';
import orderRouter from './routes/order';
import bodyParser from 'body-parser';

const cors = require('cors');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/weblarek');

app.use(cors()); 
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use('/product', productRouter);
app.use('/order', orderRouter);

app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000, () => { console.log(`listening on port 3000`); });