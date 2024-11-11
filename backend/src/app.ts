import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import bodyParser from 'body-parser';
import routes from './routes/index';
import errorHandler from './middlwares/error-handler';
import { requestLogger, errorLogger } from './middlwares/logger';

const cors = require('cors');

mongoose.connect('mongodb://127.0.0.1:27017/weblarek');

const app = express();

app.use(requestLogger);
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

app.use(errorLogger);
app.use(errorHandler);
app.listen(3000, () => { console.log('listening on port 3000'); });
