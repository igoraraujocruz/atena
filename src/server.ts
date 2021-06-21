import './database';
import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';

require('dotenv/config');

const app = express();

app.use(morgan('tiny'));

app.get('/', (request, response) =>
  response.json({
    message: process.env.APP_NAME,
  }),
);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server started on port ${process.env.APP_PORT}`);
});
