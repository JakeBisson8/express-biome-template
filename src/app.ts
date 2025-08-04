import express from 'express';
import { httpDevLogger, httpErrorLogger, httpLogger } from './httplogger';

const { NODE_ENV } = process.env;

const app = express();

// Setup HTTP Logger
app.use(httpLogger);
app.use(httpErrorLogger);
if (NODE_ENV === 'development') {
  app.use(httpDevLogger);
}

// Default endpoint
app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

export default app;
