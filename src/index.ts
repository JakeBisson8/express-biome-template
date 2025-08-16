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
    if (!environment.HTTP_ENABLED) return resolve();

    httpServer.close((err) => {
      if (err) {
        logger.error(`Error shutting down http server`);
        return reject(err);
      }
      resolve();
    });
  });

  const shutdownHTTPS = new Promise<void>((resolve, reject) => {
    if (!environment.HTTPS_ENABLED) return resolve();

    httpsServer.close((err) => {
      if (err) {
        logger.error('Error shutting down https server');
        return reject(err);
      }
      resolve();
    });
  });

  await Promise.all([shutdownHTTP, shutdownHTTPS]);

  logger.info('Bye Bye!');
};

const handleShutdownSignal = (signal: string) => async () => {
  logger.info(`${signal}: shutting down`);
  try {
    await shutdown();
    process.exit(0);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

process.on('SIGINT', handleShutdownSignal('SIGINT'));
process.on('SIGTERM', handleShutdownSignal('SIGTERM'));

// Start the app
startup();
