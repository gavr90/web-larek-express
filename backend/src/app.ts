import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import bodyParser from 'body-parser';
import { errors } from 'celebrate';
import routes from './routes/index';
import errorHandler from './middlwares/error-handler';
import { requestLogger, errorLogger } from './middlwares/logger';
import { PORT, DB_ADDRESS } from './config';

const cors = require('cors');

mongoose.connect(DB_ADDRESS);

const app = express();

app.use(requestLogger);
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => { console.log(`listening on port ${PORT}`); });
