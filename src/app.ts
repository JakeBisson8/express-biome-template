import express from 'express';
import { httpDevLogger, httpErrorLogger, httpLogger } from './config/httplogger';
import { environment } from './environment';

const app = express();

// Setup HTTP Logger
app.use(httpLogger);
app.use(httpErrorLogger);
if (environment.NODE_ENV === 'development') {
  app.use(httpDevLogger);
}

// Default endpoint
app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

export default app;
