import http from 'node:http';
import app from './app';
import logger from './logger';

const { HTTP_PORT } = process.env;

logger.info('Hello World');

const httpServer = http.createServer(app);

httpServer.listen(HTTP_PORT, () => {
  logger.info(`HTTP server listening on ${HTTP_PORT}`);
});

process.on('SIGINT', () => {
  logger.info(`Received SIGINT... shutting down gracefully.`);
  httpServer.close();
});

process.on('SIGTERM', () => {
  logger.info(`Received SIGTERM... shutting down gracefully.`);
  httpServer.close();
});

logger.info('TEST');
