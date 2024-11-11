const winston = require('winston');
// eslint-disable-next-line import/no-extraneous-dependencies
const expressWinston = require('express-winston');

export const requestLogger = expressWinston.logger({
  level: 'info',
  transports: [new winston.transports.File({ filename: 'request.log' })],
  format: winston.format.json(),
});

export const errorLogger = expressWinston.errorLogger({
  level: 'error',
  transports: [new winston.transports.File({ filename: 'error.log' })],
  format: winston.format.json(),
});
