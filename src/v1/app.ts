import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { httpDevLogger, httpErrorLogger, httpLogger } from '../config/httplogger';
import { environment } from '../environment';
import { httpRedirectToHttps } from './middleware/http-redirect-to-https';

const app = express();
app.use(express.json());

// Setup cors
app.use(cors());

// Setup helmet with HSTS
app.use(
  helmet({
    strictTransportSecurity: environment.HTTPS_ENABLED
      ? {
          maxAge: environment.HSTS_MAX_AGE,
          includeSubDomains: environment.HSTS_INCLUDE_SUBDOMAINS,
          preload: environment.HSTS_PRELOAD,
        }
      : false,
  }),
);

// Setup HTTP Logger
app.use(httpLogger);
app.use(httpErrorLogger);
if (environment.NODE_ENV === 'development') {
  app.use(httpDevLogger);
}

// Forces HTTP requests to be HTTPS if it is enabled
if (environment.HTTPS_ENABLED) {
  app.use(httpRedirectToHttps);
}

// Default endpoint
app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Hello World!' });
});

export default app;
