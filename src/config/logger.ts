import path from 'node:path';
import winston from 'winston';

const { NODE_ENV, LOG_FILE, ERROR_LOG_FILE } = process.env;

// Define the different transports
const errorLogTransport = new winston.transports.File({
  filename: path.join(__dirname, 'logs', ERROR_LOG_FILE || 'error.log'),
  level: 'error',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
});
const combinedLogTransport = new winston.transports.File({
  filename: path.join(__dirname, 'logs', LOG_FILE || 'combined.log'),
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
});
const consoleLogTransport = new winston.transports.Console({
  format: winston.format.cli(),
});

// Create logger
const logger = winston.createLogger({
  level: 'info',
  transports: [combinedLogTransport, errorLogTransport],
});

// Add the console transport if we are in development
if (NODE_ENV === 'development') {
  logger.add(consoleLogTransport);
}

export default logger;
