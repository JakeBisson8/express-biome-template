import http from 'node:http';
import app from './app';
import { environment } from './environment';
import logger from './logger';

const httpServer = http.createServer(app);

httpServer.listen(environment.HTTP_PORT, () => {
  logger.info(`HTTP server listening on ${environment.HTTP_PORT}`);
});

process.on('SIGINT', () => {
  logger.info(`Received SIGINT... shutting down gracefully.`);
  httpServer.close();
});

process.on('SIGTERM', () => {
  logger.info(`Received SIGTERM... shutting down gracefully.`);
  httpServer.close();
});
