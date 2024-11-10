import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import routes from './routes/index';
import bodyParser from 'body-parser';
import errorHandler from './middlwares/error-handler';

const cors = require('cors');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/weblarek');

app.use(cors()); 

app.use(bodyParser.json());

app.use(routes);
app.use(errorHandler);

app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000, () => { console.log(`listening on port 3000`); });