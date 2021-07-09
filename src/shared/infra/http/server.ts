import '@shared/infra/typeorm';
import 'reflect-metadata';
import '@shared/container';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import { isCelebrateError } from 'celebrate';
import AppError from '@shared/errors/AppError';
import cors from 'cors';
import routes from './routes';

require('dotenv/config');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);
app.use(routes);
app.use((error: Error, _: Request, response: Response, __: NextFunction) => {
  if (error instanceof AppError) {
    const { statusCode } = error;

    return response.status(statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  if (isCelebrateError(error)) {
    const values = error.details.values();
    let { message } = values.next().value.details[0];
    message = message.replace('"', '').replace('"', '');

    return response.status(400).json({
      status: 'error',
      type: 'validation',
      message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: error.message,
  });
});

app.use(morgan('tiny'));

app.listen(process.env.APP_PORT, () => {
  console.log(`Server started on port ${process.env.APP_PORT}`);
});
