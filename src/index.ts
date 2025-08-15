import http from 'node:http';
import https, { type ServerOptions } from 'node:https';
import app from './app';
import logger from './config/logger';
import { environment } from './environment';

const httpServer = http.createServer(app);

const options: ServerOptions = environment.HTTPS_ENABLED ? {} : {};
const httpsServer = https.createServer(options, app);

const startup = () => {
  if (environment.HTTP_ENABLED) {
    httpServer.listen(environment.HTTP_PORT, () => {
      logger.info(`HTTP server: ${environment.HTTP_PORT}`);
    });
  }

  if (environment.HTTPS_ENABLED) {
    httpsServer.listen(environment.HTTPS_PORT, () => {
      logger.info(`HTTPS server: ${environment.HTTPS_PORT}`);
    });
  }
};

const shutdown = async () => {
  logger.info('Shutting down...');

  const shutdownHTTP = new Promise<void>((resolve, reject) => {
    if (!environment.HTTP_ENABLED) resolve();

    httpServer.close((err) => {
      if (err) {
        logger.error(`Error shutting down http server`);
        reject(err);
      }
      resolve();
    });
  });

  const shutdownHTTPS = new Promise<void>((resolve, reject) => {
    if (!environment.HTTPS_ENABLED) resolve();

    httpsServer.close((err) => {
      if (err) {
        logger.error('Error shutting down https server');
        reject(err);
      }
      resolve();
    });
  });

  await Promise.all([shutdownHTTP, shutdownHTTPS]);

  logger.info('Bye Bye!');
};

process.on('SIGINT', async () => {
  logger.info(`SIGINT: shutting down`);
  await shutdown();
});

process.on('SIGTERM', async () => {
  logger.info(`SIGTERM: shutting down`);
  await shutdown();
});

// Start the app
startup();
